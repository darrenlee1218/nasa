import React from 'react';
import styled from 'styled-components';
import Body from 'components/common/body';
import { NODE_ENV, IS_PRODUCTION } from 'constants/env';
import { theme } from 'utils/theme';

const EnvLabelDiv = styled.div`
  background-color: ${theme.colors.red200};
  padding: 4px 8px;
  border-radius: 5px;
`;

const EnvLabel = () => {
  return IS_PRODUCTION ? null : (
    <EnvLabelDiv>
      <Body margin="0" size="xsmall">
        {NODE_ENV}
      </Body>
    </EnvLabelDiv>
  );
};

export default EnvLabel;
