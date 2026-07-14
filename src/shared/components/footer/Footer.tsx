const Footer = () => {
  return (
    <footer className="w-full bg-background-muted">
      <div className="flex w-full flex-col gap-[3rem] px-16 py-[3rem]">
        <div className="flex flex-col gap-[3rem]">
          <div className="flex flex-col gap-[0.2rem]">
            <p className="font-pretendard text-heading-2 font-extrabold text-black">
              MOZIP
            </p>
            <p className="font-pretendard text-body-3 text-black">
              나를 위한 혜택 모음집, 신청까지 한 번에
            </p>
          </div>

          <div className="flex flex-col gap-[0.8rem]">
            <p className="font-pretendard text-body-3 text-black">
              <span className="font-semibold">TEAM</span>
              <span className="mx-[0.8rem] text-gray-500">|</span>
              <span>Yeonjae Lee, Sungha Cho</span>
            </p>
            <p className="font-pretendard text-body-3 text-black">
              <span className="font-semibold">CONTACT</span>
              <span className="mx-[0.8rem] text-gray-500">|</span>
              <a
                href="mailto:team.mozip@gmail.com"
                className="transition-colors hover:text-gray-700"
              >
                team.mozip@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[3rem]">
          <hr className="w-full border-0 border-t border-gray-300" />
          <p className="text-center font-pretendard text-caption text-gray-500">
            © 2026 MOZIP All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
