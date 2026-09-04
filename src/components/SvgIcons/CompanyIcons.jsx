const LogoImg = ({ src, alt, size, className }) => (
  <img
    src={src}
    alt={alt}
    width={size}
    height={size}
    className={className}
    style={{ borderRadius: "4px", objectFit: "contain" }}
    draggable={false}
  />
);

export const UberIcon = ({ size = 28, className = "" }) => (
  <LogoImg src="/images/logos/uber.svg" alt="Uber" size={size} className={className} />
);

export const ElevateK12Icon = ({ size = 28, className = "" }) => (
  <LogoImg src="/images/logos/elevatek12.svg" alt="Elevate K-12" size={size} className={className} />
);

export const OlaElectricIcon = ({ size = 28, className = "" }) => (
  <LogoImg src="/images/logos/ola.svg" alt="Ola Electric" size={size} className={className} />
);

export const MNNITIcon = ({ size = 28, className = "" }) => (
  <LogoImg src="/images/logos/mnnit.svg" alt="MNNIT Allahabad" size={size} className={className} />
);

const companyMap = {
  Uber: UberIcon,
  "Elevate K-12": ElevateK12Icon,
  "Ola Electric Technologies": OlaElectricIcon,
  "MNNIT, Allahabad": MNNITIcon,
};

export const getCompanyIcon = (name) => companyMap[name] || null;

export default companyMap;
