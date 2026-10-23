export interface NavItem {
  id: string;
  label: string;
  href: string;
  num?: string;
  badge?: string;
}

export interface NavbarProps {
  navItems: NavItem[];
  activeId: string;
  onSelectNav: (id: string) => void;
  onContactClick: () => void;
  onCvClick: () => void;
}

export interface HeroProps {
  onPrimaryCta: () => void;
  onSecondaryCta: () => void;
  primaryLabel?: string;
  secondaryLabel?: string;
  supportingText?: string;
  onScrollDown?: () => void;
}

export interface HeroDescriptionProps {
  text: string;
  roleBadge?: string;
  location?: string;
}
