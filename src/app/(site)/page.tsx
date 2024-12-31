import { getConnectedDB, migrateUpdates } from "@/lib/superbase/db/db";
import Image from "next/image";
import Container from "../components/container/container";
import TitleSection from "../components/titleSection/titleSection";

import homePageBanner from "../../../public/homePageBanner.png";
import homePageBannerMobile from "../../../public/homePageBannerMobile.png";
import calenderMobile from "../../../public/calenderMobile.png";
import calenderDesktop from "../../../public/calenderDesktop.png";

import ButtonMain from "../components/button";
import AnimatedStripe from "../components/animatedStripe";
import TestimonialCard from "../components/testiminailCard";
import { testimonials } from "../components/testiminailCard/data";
import TestimonialStrip from "../components/testimonialStripe";
import PriceCard from "../components/priceCard";
import Footer from "../components/footer";

export default async function Home() {
  // const db = getConnectedDB();
  // if (db) {
  //   await migrateUpdates(db);
  // }

  return (
    <main>
      <section>
        <Container>
          <TitleSection
            title={
              <>
                All-In-One Collaboration and
                <br />
                Productivity Platform
              </>
            }
            subTitle="Your Workspace,Perfected"
          />
        </Container>
        <div className="flex flex-row justify-end items-center py-[65px] sm:py-[70px] relative sm:hidden">
          <div className="flex flex-row relative w-[360px] h-[420px] z-10">
            <Image alt="home_page_main_image" src={homePageBannerMobile} />
          </div>
          <div className="absolute flex w-[360px] h-[360px] bg-[#0469FF] opacity-60 rounded-full blur-3xl z-0" />
        </div>
        <Container>
          <div className="hidden sm:flex flex-col justify-center items-center py-[65px] sm:py-[70px] relative">
            <div className="flex flex-row relative h-[500px] z-10">
              <Image
                alt="home_page_main_image"
                src={homePageBanner}
                className="object-contain"
              />
            </div>
            <div className="flex flex-row justify-center">
              <div className="absolute flex w-[800px] h-[60px] bg-[#0469FF] opacity-80 rounded-full blur-3xl z-0 -mt-10" />
            </div>
          </div>
        </Container>
        <Container>
          <div className="flex flex-row justify-center">
            <ButtonMain type="v1" />
          </div>
          <div className="flex flex-row justify-center">
            <AnimatedStripe />
          </div>

          <TitleSection
            title={
              <>
                Keep track of your meetings
                <br />
                all in one place
              </>
            }
            subTitle="Features"
          />
          <div className="hidden sm:block text-neutral/neutral-9 text-center text-xs sm:text-base py-5">
            Capture your ideas,thoughts and meeting notes in a <br /> structured
            and organized manner.
          </div>
          <div className="text-neutral/neutral-9 text-center text-xs sm:text-base py-8 block sm:hidden">
            Capture your ideas,thoughts and meeting notes in a structured and
            organized manner.
          </div>
        </Container>
        <div className="py-2 w-full flex flex-row justify-end sm:justify-center h-[450px] relative">
          <div className="h-full w-[360px] flex sm:hidden flex-row justify-end z-10">
            <Image
              src={calenderMobile}
              alt="calender_mobile_pic"
              className="object-contain"
            />
          </div>
          <div className="hidden h-full w-[1000px]  sm:flex flex-row justify-center z-10">
            <Image
              src={calenderDesktop}
              alt="calender_mobile_pic"
              className="object-contain"
            />
          </div>
          <div className="flex flex-row justify-end sm:justify-center items-center w-full absolute bottom-0 z-0">
            <div className="absolute flex w-[400px] h-[30px] sm:w-[550px]  bottom-6 sm:bottom-0 sm:h-[60px] bg-[#0469FF] opacity-80 rounded-full blur-3xl z-0"/>
          </div>
        </div>
        <Container>
          <TitleSection title={<>Trusted by all</>} subTitle="Get Access" />
          <div className="hidden sm:block text-neutral/neutral-9 text-center text-xs sm:text-base py-5">
            Join thousands of satisfied users who rely on our platform for their
            <br />
            personal and professional productivity needs..
          </div>
          <div className="text-neutral/neutral-9 text-center text-xs sm:text-base py-8 block sm:hidden">
            Join thousands of satisfied users who rely on our platform for their
            personal and professional productivity needs..
          </div>
        </Container>
        <TestimonialStrip />
        <Container>
          <TitleSection
            title={
              <>
                The Perfect Plan
                <br />
                for you
              </>
            }
            subTitle="Pricing"
          />
          <div className="hidden sm:block text-neutral/neutral-9 text-center text-xs sm:text-base py-5">
            Experience all the benefits of our platform.
            <br />
            Select a plan that suits your needs and takes your productivity to
            new heights.
          </div>
          <div className="text-neutral/neutral-9 text-center text-xs sm:text-base py-8 block sm:hidden">
            Experience all the benefits of our platform.Select a plan that suits
            your needs and takes your productivity to new heights.
          </div>
        </Container>
        <Container>
          <div className="relative flex flex-col sm:flex-row justify-center items-center sm:items-stretch w-full gap-y-20 sm:gap-x-20 py-10">
            <PriceCard planeName="Free Plan" price="0" />
            <PriceCard
              planeName="Pro Plan"
              price="12.99"
              line1="billed annually"
              line2="$17 billed monthly"
              light
            />
          </div>
        </Container>
        <Footer />
      </section>
    </main>
  );
}
