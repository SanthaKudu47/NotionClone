import Image from "next/image";
import footerLogo from "../../../../public/footer_logo.png";
import Container from "../container/container";

function FooterData() {
  return (
    <div className="flex flex-col">
      <span className="text-white text-xs">About</span>
      <span className="text-2xs text-washed-blue/washed-blue-500">
        About Us
      </span>
      <span className="text-2xs  text-washed-blue/washed-blue-500">Blog</span>
      <span className="text-2xs  text-washed-blue/washed-blue-500">
        Careers
      </span>
      <span className="text-2xs  text-washed-blue/washed-blue-500">Jobs</span>
      <span className="text-2xs  text-washed-blue/washed-blue-500">
        In Peers
      </span>
    </div>
  );
}

function Footer() {
  return (
    <Container>
      <section className="pt-[100px]">
        <div className="py-5 flex flex-col gap-y-3">
          <div>
            <Image src={footerLogo} alt="footer_logo" width={100} />
          </div>
          <div className="text-washed-purple/washed-purple-800 text-2xs">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </div>
        </div>
        <div className="grid grid-flow-row sm:grid-flow-col grid-cols-2 sm:grid-cols-6  sm:grid-rows-1   gap-y-4">
          <FooterData />
          <FooterData />
          <FooterData />
          <FooterData />
          <FooterData />
          <FooterData />
        </div>
      </section>
      1
    </Container>
  );
}

export default Footer;
