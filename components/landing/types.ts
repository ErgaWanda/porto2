import { ReactNode } from "react";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: "chart" | "lock" | "bolt" | "shield";
  metric?: string;
}

export interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export interface GlassButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  icon?: ReactNode;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export interface NavbarProps {
  navItems: NavItem[];
  activeId: string;
  onSelectNav: (id: string) => void;
  onContactClick: () => void;
  onCvClick: () => void;
}

export interface HeroProps {
  headlineMain: string;
  headlineAccent?: string;
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

export interface FeatureCardProps {
  feature: FeatureItem;
  onClick?: () => void;
}
