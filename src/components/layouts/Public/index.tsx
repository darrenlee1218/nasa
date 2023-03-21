import Head from "next/head";
import React from "react";
import { Search } from "react-feather";
import Body from "components/common/body";
import EnvLabel from "components/common/environment/label";
import Heading from "components/common/heading";
import Link from "components/common/link";
import type { LayoutProps } from "components/layouts/types";
import Logo from "components/logo";
import { makePageTitle } from "constants/strings";
import { HEADER_HEIGHT } from "constants/style";
import { EXPLORE_URL } from "constants/urls";
import { useStaticRouter, pathnameIncludes } from "utils/useStaticRouter";
import {
  HeaderContentContainer,
  Footer,
  Header,
  Wrapper,
  Nav,
} from "../styles";

type PublicLayoutProps = LayoutProps & {
  children: React.ReactNode;
};

const PublicLayout: React.FC<PublicLayoutProps> = ({ children, title }) => {
  const router = useStaticRouter();
  const localPathnameIncludes = (pathname: string) =>
    pathnameIncludes(router, pathname);
  const makeCopyrigthText = () => `Jonathan Betts © | ${new Date().getFullYear()}`;
  const navItemHeadingLevel = 400;

  return (
    <>
      <Head>
        <title>{makePageTitle(title)}</title>
      </Head>
      <Wrapper>
        <HeaderContentContainer
          position={undefined} // on / we want the header to scroll up with the page
          paddingTop={HEADER_HEIGHT}
        >
          <Header
            showBackgroundEffects={true}
            position={"fixed"} // on / we want the header to be in the image
          >
            {/* Keep the link so flex pushes the nav to the right even though the logo is absent */}
            <Logo skipBlur />

            <Nav>
              <EnvLabel />

              <Link href={EXPLORE_URL}>
                <Heading
                  light={false}
                  selected={localPathnameIncludes(EXPLORE_URL)}
                  level={navItemHeadingLevel}
                >
                  <Search />
                </Heading>
              </Link>
            </Nav>
          </Header>
          {children}
        </HeaderContentContainer>
        <Footer>
          <Body>{makeCopyrigthText()}</Body>
        </Footer>
      </Wrapper>
    </>
  );
};

export default PublicLayout;
