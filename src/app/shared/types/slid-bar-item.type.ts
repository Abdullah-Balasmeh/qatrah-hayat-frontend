export type SideBarItem = {
    sectionTitle:string;
    sectionItems:SectionItem[];
};


export type SectionItem = {
  routerLink: string;
  icon:string;
  labelKey: string;
  exact?: boolean;
  delay: number;
};
