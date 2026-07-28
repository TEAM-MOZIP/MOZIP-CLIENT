import { useState, type SubmitEventHandler } from 'react';
import { Link } from 'react-router-dom';
import InputField from '@shared/components/auth/InputField';
import Button from '@shared/components/auth/Button';
import DuplicateCheckButton from '@pages/signup/components/DuplicateCheckButton';
import {
  getAuthFieldValidationError,
  getEmailSubmitError,
  getNicknameSubmitError,
  getPasswordConfirmSubmitError,
  getPasswordSubmitError,
  NICKNAME_HELPER_MESSAGE,
  PASSWORD_HELPER_MESSAGE,
} from '@shared/utils/authValidation';
import logo from '@shared/assets/logo.svg';
import kakaoIcon from '@shared/assets/icons/kakao-icon.svg';
import checkWhiteIcon from '@shared/assets/icons/check-white.svg';
import arrowRightIcon from '@shared/assets/icons/arrow-right.svg';

type FieldErrors = {
  email?: string;
  nickname?: string;
  password?: string;
  confirmPassword?: string;
  privacy?: boolean;
};

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const clearFieldError = (field: keyof FieldErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const nextErrors: FieldErrors = {};

    const emailError = getEmailSubmitError(email);
    if (emailError) nextErrors.email = emailError;

    const nicknameError = getNicknameSubmitError(nickname);
    if (nicknameError) nextErrors.nickname = nicknameError;

    const passwordError = getPasswordSubmitError(password);
    if (passwordError) nextErrors.password = passwordError;

    const confirmPasswordError = getPasswordConfirmSubmitError(
      password,
      confirmPassword
    );
    if (confirmPasswordError) nextErrors.confirmPassword = confirmPasswordError;

    if (!agreePrivacy) {
      nextErrors.privacy = true;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;
  };

  return (
    <section className="flex min-h-[calc(100dvh-8.1rem)] w-full items-center justify-center bg-white px-16 py-[6.5rem]">
      <div className="flex w-full max-w-[40rem] flex-col items-center">
        <img
          src={logo}
          alt="MOZIP"
          className="h-[6rem] w-auto"
          draggable={false}
        />
        <p className="mt-[4rem] text-center text-[2.4rem] text-gray-500 font-medium">
          나를 위한 혜택 모음집, 신청까지 한 번에
        </p>

        <form
          noValidate
          onSubmit={handleSubmit}
          className="mt-[8rem] flex w-full flex-col gap-[2.4rem]"
        >
          <InputField
            label="이메일"
            type="email"
            value={email}
            validate="email"
            onChange={(e) => {
              setEmail(e.target.value);
              clearFieldError('email');
            }}
            errorMessage={errors.email}
            autoComplete="email"
            required
            sideButton={<DuplicateCheckButton />}
          />

          <InputField
            label="닉네임"
            type="text"
            value={nickname}
            validate="nickname"
            maxLength={20}
            onChange={(e) => {
              setNickname(e.target.value);
              clearFieldError('nickname');
            }}
            errorMessage={errors.nickname}
            helperMessage={NICKNAME_HELPER_MESSAGE}
            autoComplete="nickname"
            required
            suffix={
              <span className="text-caption text-gray-500">
                {nickname.length}/20
              </span>
            }
            sideButton={<DuplicateCheckButton />}
          />

          <InputField
            label="비밀번호"
            type="password"
            value={password}
            validate="password"
            onChange={(e) => {
              setPassword(e.target.value);
              clearFieldError('password');
            }}
            errorMessage={errors.password}
            helperMessage={PASSWORD_HELPER_MESSAGE}
            autoComplete="new-password"
            required
          />

          <InputField
            label="비밀번호 확인"
            type="password"
            value={confirmPassword}
            validate="passwordMatch"
            compareValue={password}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              clearFieldError('confirmPassword');
            }}
            onFocus={() => {
              const passwordError = getAuthFieldValidationError(
                'password',
                password
              );
              setErrors((prev) => ({ ...prev, password: passwordError }));
            }}
            errorMessage={errors.confirmPassword}
            autoComplete="new-password"
            required
          />

          <label className="flex cursor-pointer items-center gap-[0.8rem]">
            <span className="relative flex size-[1.8rem] shrink-0 items-center justify-center">
              <input
                type="checkbox"
                checked={agreePrivacy}
                aria-invalid={errors.privacy || undefined}
                onChange={(e) => {
                  setAgreePrivacy(e.target.checked);
                  clearFieldError('privacy');
                }}
                className="peer absolute inset-0 cursor-pointer opacity-0"
              />
              <span
                className={[
                  'pointer-events-none size-full rounded-[0.4rem] border bg-white peer-checked:bg-gray-500 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400',
                  errors.privacy ? 'border-point' : 'border-gray-500',
                ].join(' ')}
              />
              <img
                src={checkWhiteIcon}
                alt=""
                aria-hidden
                draggable={false}
                className="pointer-events-none absolute top-1/2 left-1/2 size-[1.2rem] -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100"
              />
            </span>
            <span
              className={[
                'text-caption',
                errors.privacy ? 'text-point' : 'text-gray-700',
              ].join(' ')}
            >
              개인정보 제공 및 활용에 동의합니다.
            </span>
          </label>

          <div className="flex flex-col gap-[1.6rem]">
            <Button type="submit" variant="primary">
              회원가입
            </Button>

            <div className="flex items-center gap-[2.4rem]">
              <div className="h-px flex-1 bg-gray-300" aria-hidden />
              <span className="text-caption text-gray-500">또는</span>
              <div className="h-px flex-1 bg-gray-300" aria-hidden />
            </div>

            <Button
              type="button"
              variant="kakao"
              leftIcon={
                <img
                  src={kakaoIcon}
                  alt=""
                  className="size-[2.4rem]"
                  aria-hidden
                  draggable={false}
                />
              }
            >
              카카오 로그인
            </Button>
          </div>
        </form>

        <div className="mt-[4rem] flex items-center gap-[1.2rem] text-body-3 text-gray-700">
          이미 회원이신가요?
          <Link
            to="/login"
            className="inline-flex items-center gap-[0.8rem] font-bold text-gray-700"
          >
            로그인하기
            <img
              src={arrowRightIcon}
              alt=""
              aria-hidden
              draggable={false}
              className="h-[1.2rem] w-auto"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
