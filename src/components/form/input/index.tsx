import { useField } from 'formik';
import React from 'react';
import styled from 'styled-components';
import Body from 'components/common/body';
import { getFontCss, theme } from 'utils/theme';

type InputElementProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface StyledInputProps {
  width?: string;
}

export type InputProps = Pick<
  InputElementProps,
  | 'className'
  | 'disabled'
  | 'id'
  | 'multiple'
  | 'name'
  | 'onBlur'
  | 'onChange'
  | 'onDragOver'
  | 'onDragLeave'
  | 'onDrop'
  | 'onFocus'
  | 'placeholder'
  | 'required'
  | 'type'
  | 'value'
  | 'accept'
> & {
  label?: string;
  name: string;
  description?: string;
  fullWidth?: boolean;
  labelActions?: React.ReactNode;
  margin?: string;
} & StyledInputProps;

export const CustomSimpleInput = styled.input<StyledInputProps>`
  font-size: 1rem;
  border: none;
  background-color: inherit;
  ${(props) => (props.width ? `width ${props.width};` : '')}
  ${getFontCss({})}
  padding: 10px 20px;
  display: flex;
  outline: none;
`;

const CustomInput = styled.input<StyledInputProps>`
  border: 1px solid ${theme.colors.gray300};
  border-radius: 10px;
  width: ${(props) => props.width || '300px'};
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

const TextInputDiv = styled.div<{ margin?: string }>`
  margin: ${(props) => props.margin || '10px 0'};
  width: 100%;
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

export const TextInput = ({
  label,
  description,
  fullWidth,
  labelActions,
  margin,
  ...props
}: InputProps) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, errors] = useField(props);
  return (
    <TextInputDiv margin={margin}>
      <LabelDiv>
        <label htmlFor={props.id || props.name}>
          <Body color={theme.colors.black}>{label}</Body>
        </label>
        <LabelActionsDiv>{labelActions}</LabelActionsDiv>
      </LabelDiv>
      <CustomInput
        className="text-input"
        {...field}
        {...props}
        {...(fullWidth ? { width: '100%' } : {})}
      />
      <Body color={theme.colors.black} size="xsmall">
        {description}
      </Body>
      {errors.touched && errors.error && (
        <>
          {/* br to add a line between description and error. */}
          <br style={{ margin: '0px', padding: '0px' }} />
          <Body margin="0" size="xsmall" color={theme.customColors.error}>
            {errors.touched && errors.error}
          </Body>
        </>
      )}
    </TextInputDiv>
  );
};
