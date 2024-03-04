import { TDefaultIconProps } from "@src/icons/type.ts";

function LoadingIcon({ className = '' }: TDefaultIconProps) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24"><rect width={6} height={14} x={1} y={4} fill="#E26EE5"><animate id="svgSpinnersBarsScaleFade0" fill="freeze" attributeName="y" begin="0;svgSpinnersBarsScaleFade1.end-0.5s" dur="1.5s" values="1;5"></animate><animate fill="freeze" attributeName="height" begin="0;svgSpinnersBarsScaleFade1.end-0.5s" dur="1.5s" values="22;14"></animate><animate fill="freeze" attributeName="opacity" begin="0;svgSpinnersBarsScaleFade1.end-0.5s" dur="1.5s" values="1;0.2"></animate></rect><rect width={6} height={14} x={9} y={4} fill="#E26EE5" opacity={0.4}><animate fill="freeze" attributeName="y" begin="svgSpinnersBarsScaleFade0.begin+0.3s" dur="1.5s" values="1;5"></animate><animate fill="freeze" attributeName="height" begin="svgSpinnersBarsScaleFade0.begin+0.3s" dur="1.5s" values="22;14"></animate><animate fill="freeze" attributeName="opacity" begin="svgSpinnersBarsScaleFade0.begin+0.3s" dur="1.5s" values="1;0.2"></animate></rect><rect width={6} height={14} x={17} y={4} fill="#E26EE5" opacity={0.3}><animate id="svgSpinnersBarsScaleFade1" fill="freeze" attributeName="y" begin="svgSpinnersBarsScaleFade0.begin+0.6s" dur="1.5s" values="1;5"></animate><animate fill="freeze" attributeName="height" begin="svgSpinnersBarsScaleFade0.begin+0.6s" dur="1.5s" values="22;14"></animate><animate fill="freeze" attributeName="opacity" begin="svgSpinnersBarsScaleFade0.begin+0.6s" dur="1.5s" values="1;0.2"></animate></rect></svg>
  );
}

export default LoadingIcon;
