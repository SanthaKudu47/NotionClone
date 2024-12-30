import Image from "next/image";
import footerLogo from "../../../../public/footer_logo.png";
import Container from "../container/container";

function Footer() {
  return (
    <Container>
      <section>
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
      </section>
    </Container>
  );
}

export default Footer;
