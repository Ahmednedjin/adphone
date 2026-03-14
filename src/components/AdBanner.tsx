const AdBanner = ({ className = "", height = "90px" }: { className?: string; height?: string }) => (
  <div className={`ad-banner ${className}`} style={{ minHeight: height }}>
    <span className="text-muted-foreground text-sm">مساحة إعلانية</span>
  </div>
);

export default AdBanner;
