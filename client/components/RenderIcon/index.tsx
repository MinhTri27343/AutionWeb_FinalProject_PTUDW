import { FC, SVGProps } from "react";

interface RenderIconProps {
  icon?: FC<SVGProps<SVGSVGElement>>;
  className?: string; // className người dùng tự truyền
}

export default function RenderIcon({ icon: Icon, className }: RenderIconProps) {
  return <>{Icon && <Icon className={className} />}</>;
}
