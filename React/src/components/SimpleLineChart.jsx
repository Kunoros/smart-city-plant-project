import React, { useState, useRef } from "react";

// SimpleLineChart
// Props:
// - series: [{ name, color, points: [{t, v}] }]
// - height: px
// - yDomain: { min, max } optional override for the Y axis
// Renders a simple SVG line chart and a vertical legend on the right showing latest value.
export default function SimpleLineChart({ series = [], height = 120, yDomain = null }) {
  const allPoints = series.flatMap(s => s.points || []);
  if (!allPoints.length) return <div className="text-sm text-gray-500">No data</div>;

  const values = allPoints.map(p => p.v);
  const autoMin = Math.min(...values);
  const autoMax = Math.max(...values);
  const padding = 8;

  // use provided yDomain if present, otherwise auto
  const min = yDomain && typeof yDomain.min === 'number' ? yDomain.min : autoMin;
  const max = yDomain && typeof yDomain.max === 'number' ? yDomain.max : autoMax;

  const len = series[0].points.length;
  const width = Math.min(720, Math.max(200, len * 40));

  // reserve extra left space for Y axis labels
  const labelArea = 48; // px reserved on left for labels
  const leftPadding = padding + labelArea;
  const rightPadding = padding;

  const xFor = i => leftPadding + (i / Math.max(1, len - 1)) * (width - leftPadding - rightPadding);
  const yFor = v => {
    if (max === min) return height / 2;
    // clamp v to domain to avoid drawing outside
    const vv = Math.max(min, Math.min(max, v));
    return padding + (1 - (vv - min) / (max - min)) * (height - padding * 2);
  };

  const paths = series.map(s => {
    const pts = s.points || [];
    const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i)} ${yFor(p.v)}`).join(' ');
    return { color: s.color || '#333', d, pts };
  });

  // Legend items include latest value
  const legendItems = series.map(s => {
    const pts = s.points || [];
    const last = pts.length ? pts[pts.length - 1].v : null;
    return { name: s.name, color: s.color || '#333', last };
  });

  // build Y axis ticks (5 ticks by default)
  const ticksCount = 5;
  const ticks = [];
  if (max === min) {
    ticks.push({ value: min, y: yFor(min) });
  } else {
    for (let i = 0; i < ticksCount; i++) {
      const t = min + (i / (ticksCount - 1)) * (max - min);
      ticks.push({ value: t, y: yFor(t) });
    }
  }

  const formatValue = v => {
    // simple formatting: integer when values are effectively integers, else 2 decimals
    if (v == null || Number.isNaN(v)) return '-';
    if (Math.abs(v - Math.round(v)) < 0.0001) return String(Math.round(v));
    return String(Number(v).toFixed(2));
  };

  // Hover state
  const [hoverIndex, setHoverIndex] = useState(null);
  const svgRef = useRef(null);

  const onSvgMouseMove = e => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const ratio = (mouseX - leftPadding) / (width - leftPadding - rightPadding);
    const fi = Math.round(ratio * (len - 1));
    const idx = Math.max(0, Math.min(len - 1, fi));
    setHoverIndex(idx);
  };

  const onSvgMouseLeave = () => {
    setHoverIndex(null);
  };

  // tooltip layout
  const tooltipWidth = 140;
  const tooltipPadding = 6;

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div style={{ overflowX: 'auto', position: 'relative' }}>
        <svg
          ref={svgRef}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          onMouseMove={onSvgMouseMove}
          onMouseLeave={onSvgMouseLeave}
        >
          {/* grid lines */}
          <g stroke="#eee">
            <line x1={leftPadding} x2={width - rightPadding} y1={padding} y2={padding} />
            <line x1={leftPadding} x2={width - rightPadding} y1={height / 2} y2={height / 2} />
            <line x1={leftPadding} x2={width - rightPadding} y1={height - padding} y2={height - padding} />
          </g>

          {/* Y axis line and ticks */}
          <g>
            {/* axis line */}
            <line x1={leftPadding} x2={leftPadding} y1={padding} y2={height - padding} stroke="#cbd5e1" />

            {/* ticks and labels */}
            {ticks.map((t, i) => (
              <g key={i}>
                <line x1={leftPadding - 6} x2={leftPadding} y1={t.y} y2={t.y} stroke="#cbd5e1" />
                <text x={leftPadding - 10} y={t.y + 4} fontSize={12} fill="#6b7280" textAnchor="end">
                  {formatValue(t.value)}
                </text>
              </g>
            ))}
          </g>

          {/* series paths */}
          {paths.map((p, idx) => (
            <path key={idx} d={p.d} fill="none" stroke={p.color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          ))}

          {/* draw points for first series */}
          {paths[0].pts.map((pt, i) => (
            <circle key={i} cx={xFor(i)} cy={yFor(pt.v)} r={2.2} fill={paths[0].color} />
          ))}

          {/* hover indicators */}
          {hoverIndex !== null && (
            <g>
              {/* vertical hover line */}
              <line
                x1={xFor(hoverIndex)}
                x2={xFor(hoverIndex)}
                y1={padding}
                y2={height - padding}
                stroke="#9ca3af"
                strokeWidth={1}
                strokeDasharray="4 3"
              />

              {/* circles for each series at hover index */}
              {paths.map((p, si) => {
                const pt = p.pts[hoverIndex];
                if (!pt) return null;
                return (
                  <circle key={si} cx={xFor(hoverIndex)} cy={yFor(pt.v)} r={4} fill="#fff" stroke={p.color} strokeWidth={2} />
                );
              })}

              {/* tooltip box (SVG) - placed near top but shifted to avoid overflowing */}
              <g>
                {(() => {
                  const txRaw = xFor(hoverIndex) + 8;
                  const tx = Math.min(width - rightPadding - tooltipWidth - 8, Math.max(leftPadding + 6, txRaw));
                  const ty = padding + 6;
                  const lines = series.map(s => {
                    const pts = s.points || [];
                    const v = pts[hoverIndex] ? pts[hoverIndex].v : null;
                    return { name: s.name, color: s.color || '#333', value: v };
                  });

                  return (
                    <g transform={`translate(${tx}, ${ty})`}>
                      <rect x={0} y={0} width={tooltipWidth} height={tooltipPadding * 2 + lines.length * 16} fill="#fff" stroke="#e5e7eb" rx={6} />
                      {lines.map((ln, i) => (
                        <g key={i} transform={`translate(${tooltipPadding}, ${tooltipPadding + i * 16})`}>
                          <rect x={0} y={0} width={10} height={10} fill={ln.color} rx={2} />
                          <text x={14} y={10} fontSize={12} fill="#111827">
                            {ln.name}: {ln.value !== null && ln.value !== undefined ? formatValue(ln.value) : '-'}
                          </text>
                        </g>
                      ))}
                    </g>
                  );
                })()}
              </g>
            </g>
          )}
        </svg>
      </div>

      {/* vertical legend showing name, color and latest value */}
      <div style={{ minWidth: 140, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {legendItems.map((it, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 12, height: 12, background: it.color, display: 'inline-block', borderRadius: 2 }} />
              <div style={{ fontSize: 13 }}>{it.name}</div>
            </div>
            <div style={{ fontSize: 13, color: '#374151', fontWeight: 600 }}>{it.last !== null ? String(it.last) : '-'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
