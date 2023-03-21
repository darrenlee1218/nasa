import { useField } from 'formik';
import React from 'react';
import styled from 'styled-components';
import Body from 'components/common/body';
import { getFontCss, theme } from 'utils/theme';

interface StyledInputProps {
  width?: string;
}

type TextareaElementProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

type TextareaProps = Pick<
  TextareaElementProps,
  | 'className'
  | 'disabled'
  | 'id'
  | 'name'
  | 'onBlur'
  | 'onChange'
  | 'placeholder'
  | 'required'
  | 'rows'
  | 'value'
> & { label: string; name: string; labelActions?: React.ReactNode };

const CustomTextArea = styled.textarea<StyledInputProps>`
  border: 1px solid ${theme.colors.gray300};
  width: 100%;
  max-width: 100%;
  min-height: 80px;
  border-radius: 10px;
  background-color: inherit;
  ${(props) => (props.width ? `width ${props.width};` : '')}
  ${getFontCss({})}
  padding: 10px 20px;
  display: flex;

  &:focus {
    outline: none;
    border-color: ${theme.colors.gray600};
  }
`;

const LabelDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LabelActionsDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TextArea = ({ label, labelActions, ...props }: TextareaProps) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, errors] = useField(props);
  return (
    <span style={{ margin: 0 }}>
      <LabelDiv>
        <label htmlFor={props.id || props.name}>
          <Body color={theme.colors.black}>{label}</Body>
        </label>
        <LabelActionsDiv>{labelActions}</LabelActionsDiv>
      </LabelDiv>
      <CustomTextArea className="text-area" {...field} {...props} />
      <Body size="xsmall" color={theme.customColors.error}>
        {errors.touched && errors.error}
      </Body>
    </span>
  );
};
