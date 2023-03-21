import React from 'react';
import CSSTransition, { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';
import fadeInStyles from './FadeIn.module.css';

interface FadeInProps {
  children: React.ReactElement<{ className?: string }>;
  inView: boolean;
  skipFadeIn?: boolean;
}

const FadeIn = ({ children, inView, skipFadeIn }: FadeInProps) => {
  const child = React.Children.only(children);
  return (
    <CSSTransition
      in={inView}
      timeout={skipFadeIn ? 0 : 800}
      classNames={fadeInStyles as CSSTransitionClassNames}
    >
      {React.cloneElement(child, {
        className: !inView ? fadeInStyles.preEnter : '',
      })}
    </CSSTransition>
  );
};

export default FadeIn;
