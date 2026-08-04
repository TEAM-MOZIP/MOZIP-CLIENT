import { useState, type SubmitEventHandler } from 'react';
import { Link } from 'react-router-dom';
import InputField from '@shared/components/auth/InputField';
import Button from '@shared/components/auth/Button';
import {
  getAuthFieldValidationError,
  getEmailSubmitError,
  getPasswordSubmitError,
} from '@shared/utils/authValidation';
import logo from '@shared/assets/logo.svg';
import kakaoIcon from '@shared/assets/icons/kakao-icon.svg';
import checkWhiteIcon from '@shared/assets/icons/check-white.svg';
import arrowRightIcon from '@shared/assets/icons/chevron-right.svg';

type FieldErrors = {
  email?: string;
  password?: string;
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const nextErrors: FieldErrors = {};

    const emailError = getEmailSubmitError(email);
    if (emailError) nextErrors.email = emailError;

    const passwordError = getPasswordSubmitError(password);
    if (passwordError) nextErrors.password = passwordError;

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
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors((prev) => ({ ...prev, email: undefined }));
              }
            }}
            errorMessage={errors.email}
            autoComplete="email"
            required
          />

          <InputField
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) {
                setErrors((prev) => ({ ...prev, password: undefined }));
              }
            }}
            onFocus={() => {
              const emailError = getAuthFieldValidationError('email', email);
              setErrors((prev) => ({ ...prev, email: emailError }));
            }}
            errorMessage={errors.password}
            autoComplete="current-password"
            required
          />

          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-[0.8rem]">
              <span className="relative flex size-[1.8rem] shrink-0 items-center justify-center">
                <input
                  type="checkbox"
                  checked={keepLoggedIn}
                  onChange={(e) => setKeepLoggedIn(e.target.checked)}
                  className="peer absolute inset-0 cursor-pointer opacity-0"
                />
                <span className="pointer-events-none size-full rounded-[0.4rem] border border-gray-500 bg-white peer-checked:bg-gray-500 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400" />
                <img
                  src={checkWhiteIcon}
                  alt=""
                  aria-hidden
                  draggable={false}
                  className="pointer-events-none absolute top-1/2 left-1/2 size-[1.2rem] -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100"
                />
              </span>
              <span className="text-caption text-gray-700">로그인 유지</span>
            </label>

            <button
              type="button"
              className="cursor-pointer text-caption text-gray-700"
            >
              아이디 · 비밀번호 찾기
            </button>
          </div>

          <div className="flex flex-col gap-[1.6rem]">
            <Button type="submit" variant="primary">
              로그인
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
          아직 회원이 아니신가요?
          <Link
            to="/signup"
            className="inline-flex items-center gap-[0.8rem] font-bold text-gray-700"
          >
            회원가입하기
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

export default LoginPage;
