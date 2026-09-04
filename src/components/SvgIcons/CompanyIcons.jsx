const LogoImg = ({ src, alt = "", size, className, "aria-hidden": ariaHidden = true }) => (
  <img
    src={src}
    alt={alt}
    aria-hidden={ariaHidden}
    width={size}
    height={size}
    className={className}
    style={{ borderRadius: "4px", objectFit: "contain" }}
    draggable={false}
  />
);

export const UberIcon = ({ size = 28, className = "", alt = "", ...props }) => (
  <LogoImg src="/images/logos/uber.svg" alt={alt} size={size} className={className} {...props} />
);

export const ElevateK12Icon = ({ size = 28, className = "", alt = "", ...props }) => (
  <LogoImg src="/images/logos/elevatek12.svg" alt={alt} size={size} className={className} {...props} />
);

export const OlaElectricIcon = ({ size = 28, className = "", alt = "", ...props }) => (
  <LogoImg src="/images/logos/ola.svg" alt={alt} size={size} className={className} {...props} />
);

export const MNNITIcon = ({ size = 28, className = "", alt = "", ...props }) => (
  <LogoImg src="/images/logos/mnnit.svg" alt={alt} size={size} className={className} {...props} />
);

const companyMap = {
  Uber: UberIcon,
  "Elevate K-12": ElevateK12Icon,
  "Ola Electric Technologies": OlaElectricIcon,
  "MNNIT, Allahabad": MNNITIcon,
};

export const getCompanyIcon = (name) => companyMap[name] || null;

export default companyMap;
