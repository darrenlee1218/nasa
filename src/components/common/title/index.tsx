import React from "react";
import Heading from "components/common/heading";
import WithMargin, {
  WithMarginProps,
} from "components/common/margin/withMargin";

type TitleProps = {
  children: React.ReactNode;
} & WithMarginProps;

const Title = ({ children, ...rest }: TitleProps) => {
  return (
    <WithMargin {...rest}>
      <Heading level={200}>{children}</Heading>
    </WithMargin>
  );
};

export default Title;
