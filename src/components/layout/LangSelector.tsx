import React from "react";
import {Dropdown,Button,Language} from "@vipswap/uikit";
import styled from "styled-components";
import LanguageIcon from "../Svg/Language";

interface Props {
  currentLang: string;
  langs: Language[];
  setLang: (lang: Language) => void;
  isMobile?: boolean;
}
export const scales = {
  MD: "md",
  SM: "sm",
  XS: "xs",
} as const;
const MenuButton = styled(Button)`
  color: ${({ theme }) => theme.colors.navText};
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  box-shadow: none;
`;
const LangMenuButton = styled(MenuButton)`
  background-color: ${({ theme }) => theme.colors.navItemBg};
  border-radius: 0px;
  &:hover {
     background-color: ${({ theme }) => theme.expandColor.color.active};
     color: ${({ theme }) => theme.expandColor.color.white};
  }
`

const LangSelector: React.FC<Props> = ({ currentLang, langs, setLang, isMobile=false }) => (
  <Dropdown
    position={isMobile?"top":"bottom"}
    target={
      <Button scale={scales.XS} variant="text" startIcon={<LanguageIcon color="navActivityText" width="24px" />} />
    }
  >
    {langs.map((lang) => (
      <LangMenuButton
        key={`${lang.code}T`}
        fullWidth
        onClick={() => setLang(lang)}
        // Safari fix
        style={{ minHeight: "32px", height: "auto" }}
      >
        {lang.language}
      </LangMenuButton>
    ))}
  </Dropdown>
);

export default LangSelector;
