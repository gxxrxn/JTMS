import styled from "@emotion/styled";

type WrapperProps = {
  block?: boolean;
};

type StyledInputProps = {
  invalid?: boolean;
};

// Wrapper로 감싼 형태의 input 만들기
const Wrapper = styled.div<WrapperProps>`
  display: ${({ block }) => (block ? "block" : "inline-block")};
`;

const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  padding: 4px 8px;
  border: 1px solid ${({ invalid }) => (invalid ? "red" : "gray")};
  border-radius: 4px;
  box-sizing: border-box;
`;

const Label = styled.label`
  display: block;
  font-size: 12px;
`;

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
  block?: boolean;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  wrapperProps: Omit<React.HTMLAttributes<HTMLDivElement>, "display">;
}

const Input = ({
  label,
  block = false,
  invalid = false,
  required = false,
  disabled = false,
  readOnly = false,
  wrapperProps,
  ...props
}: InputProps) => {
  return (
    <Wrapper block={block} {...wrapperProps}>
      <Label>{label}</Label>
      <StyledInput
        invalid={invalid}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        {...props}
      />
    </Wrapper>
  );
};

export default Input;
