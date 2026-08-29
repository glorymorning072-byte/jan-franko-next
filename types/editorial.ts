export type BackgroundStyle = "clean-white" | "parchment-beige" | "slate-dark";

export interface ButtonGroupItem {
  text: string;
  url: string;
  style?: "primary" | "secondary";
}

export interface EditorialHero {
  eyebrow?: string;
  heading?: string;
  description?: string;
  image_external_url?: string;
  image_media?: number | null;
  button_group?: ButtonGroupItem[] | null;
}

export interface QuickStat {
  label: string;
  value: string;
}

export interface Intro7525Section {
  acf_fc_layout: "intro_75_25";
  background_style: BackgroundStyle;
  heading?: string;
  main_text?: string;
  sidebar_eyebrow?: string;
  quick_stats?: QuickStat[];
  button_group?: ButtonGroupItem[] | null;
}

export interface SideBySideSection {
  acf_fc_layout: "side_by_side";
  background_style: BackgroundStyle;
  image_alignment?: "left" | "right";
  image_external_url?: string;
  image_media?: number | null;
  eyebrow?: string;
  title?: string;
  text_content?: string;
  button_group?: ButtonGroupItem[] | null;
}

export interface CenteredBreakoutSection {
  acf_fc_layout: "centered_breakout";
  background_style: BackgroundStyle;
  quote_text?: string;
  attribution?: string;
  button_group?: ButtonGroupItem[] | null;
}

export interface TimelineMilestone {
  time_marker?: string;
  title?: string;
  description?: string;
}

export interface EditorialTimelineSection {
  acf_fc_layout: "editorial_timeline";
  background_style: BackgroundStyle;
  eyebrow?: string;
  heading?: string;
  milestones?: TimelineMilestone[];
  button_group?: ButtonGroupItem[] | null;
}

export interface InfoBoxItem {
  tag?: string;
  title?: string;
  description?: string;
}

export interface InfoBoxX3Section {
  acf_fc_layout: "info_box_x3";
  background_style: BackgroundStyle;
  eyebrow?: string;
  heading?: string;
  boxes?: InfoBoxItem[];
  button_group?: ButtonGroupItem[] | null;
}

export interface AccordionItem {
  trigger?: string;
  panel?: string;
}

export interface EditorialAccordionSection {
  acf_fc_layout: "editorial_accordion";
  background_style: BackgroundStyle;
  eyebrow?: string;
  heading?: string;
  items?: AccordionItem[];
  button_group?: ButtonGroupItem[] | null;
}

export interface FeatureMatrixColumn {
  title?: string;
  desc?: string;
}

export interface FeatureMatrixX4Section {
  acf_fc_layout: "feature_matrix_x4";
  background_style: BackgroundStyle;
  eyebrow?: string;
  heading?: string;
  columns?: FeatureMatrixColumn[];
  button_group?: ButtonGroupItem[] | null;
}

export interface OversizedStatSection {
  acf_fc_layout: "oversized_stat";
  background_style: BackgroundStyle;
  stat_number?: string;
  stat_label?: string;
  description?: string;
  button_group?: ButtonGroupItem[] | null;
}

export interface FullBleedFeatureSection {
  acf_fc_layout: "full_bleed_feature";
  background_style: BackgroundStyle;
  background_image_external_url?: string;
  background_image_media?: number | null;
  eyebrow?: string;
  heading?: string;
  description?: string;
  button_group?: ButtonGroupItem[] | null;
}

export type EditorialBodySection =
  | Intro7525Section
  | SideBySideSection
  | CenteredBreakoutSection
  | EditorialTimelineSection
  | InfoBoxX3Section
  | EditorialAccordionSection
  | FeatureMatrixX4Section
  | OversizedStatSection
  | FullBleedFeatureSection;

export interface EditorialFinalCTA {
  eyebrow?: string;
  heading?: string;
  description?: string;
  button_group?: ButtonGroupItem[] | null;
}

export interface EditorialACF {
  hero?: EditorialHero;
  body_sections?: EditorialBodySection[];
  final_cta?: EditorialFinalCTA;
  card_title?: string;
  card_description?: string;
  card_bullet_1?: string;
  card_bullet_2?: string;
  card_bullet_3?: string;
  card_button_text?: string;
}

export interface EditorialItem {
  id: number;
  slug: string;
  parent: number;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  featured_media?: number;
  acf?: EditorialACF;
}
