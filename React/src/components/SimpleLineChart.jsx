import React from "react";

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

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div style={{ overflowX: 'auto' }}>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
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
