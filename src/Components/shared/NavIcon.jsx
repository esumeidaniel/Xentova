export const BrandMark = ({ className = '' }) => (
  <span className={`brand-mark ${className}`} aria-hidden="true">
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4">
      <path d="M12 13.5 36 37.5" />
      <path d="M36 13.5 12 37.5" />
      <path d="M16 8.5a18 18 0 0 1 16 0" />
      <path d="M16 42.5a18 18 0 0 0 16 0" />
      <path d="M24 5.5v7" />
      <path d="M24 35.5v7" />
    </svg>
  </span>
)

export const SideNavIcon = ({ type }) => {
  const paths = {
    home: (
      <>
        <path d="M4 11.5 12 5l8 6.5" />
        <path d="M6.5 10.5V20h11v-9.5" />
        <path d="M10 20v-5h4v5" />
      </>
    ),
    portfolio: (
      <>
        <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
        <path d="M4 8h16v11H4z" />
      </>
    ),
    markets: (
      <>
        <path d="M4 18V8" />
        <path d="M10 18V5" />
        <path d="M16 18v-7" />
        <path d="M22 18H2" />
      </>
    ),
    trades: <path d="M4 13h4l2-6 4 12 2-6h4" />,
    signals: (
      <>
        <path d="M2 12h3" />
        <path d="M5 7a7 7 0 0 1 0 10" />
        <path d="M19 12h3" />
        <path d="M19 7a7 7 0 0 0 0 10" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
    copy: (
      <>
        <path d="M8 8h10v10H8z" />
        <path d="M6 16H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </>
    ),
    more: (
      <>
        <circle cx="12" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
      </>
    ),
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
      {paths[type]}
    </svg>
  )
}
