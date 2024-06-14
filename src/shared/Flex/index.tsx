import { ReactNode, useMemo } from "react";

interface FlexProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}

export const Flex = ({ children, style, ...rest }: FlexProps) => {
  const finalStyle = useMemo(() => Object.assign({ display: "flex", flex: 1 }, style), [style]);

  return (
    <div {...rest} style={finalStyle}>
      {children}
    </div>
  );
};
