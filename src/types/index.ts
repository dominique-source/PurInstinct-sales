export type ContactStatus =
  | 'non_contacté'
  | 'message_envoyé'
  | 'réponse_reçue'
  | 'rendez_vous_fixé'
  | 'partenariat_actif'
  | 'pas_intéressé';

export type ListeType = 'grandes_entreprises' | 'startups' | 'secrets';

export interface ContactRH {
  id: string;
  nom_entreprise: string;
  secteur: string;
  ville: string;
  region: 'quebec_ville' | 'montreal' | 'gatineau' | 'autre';
  liste: ListeType;
  nb_employes?: string;
  site_web?: string;
  contact_rh?: string;
  linkedin_url?: string;
  email_type?: string;
  telephone?: string;
  status: ContactStatus;
  notes: string;
  date_contact?: string;
  date_relance?: string;
  priorite: 1 | 2 | 3;
  tags: string[];
  linkedin_reseau?: boolean;
}

export interface EtablissementScolaire {
  id: string;
  type: 'css_francophone' | 'cs_anglophone' | 'ecole_privee' | 'cs_statut_particulier' | 'cs_ontario';
  nom: string;
  region: string;
  ville_siege: string;
  province: 'QC' | 'ON';
  site_web?: string;
  telephone?: string;
  contact_responsable?: string;
  linkedin_url?: string;
  email?: string;
  status: ContactStatus;
  notes: string;
  date_contact?: string;
  nb_ecoles?: number;
  nb_eleves?: number;
  priorite: 1 | 2 | 3;
  tags: string[];
}

export interface Badge {
  id: string;
  nom: string;
  emoji: string;
  description: string;
  condition: (stats: DailyStats) => boolean;
  obtenu: boolean;
  date_obtenu?: string;
}

export interface DailyStats {
  contacts_aujourd_hui: number;
  total_contacts: number;
  streak_jours: number;
  reponses_recues: number;
  rdv_fixes: number;
  partenariats: number;
}

export type ActiveView =
  | 'grandes_entreprises'
  | 'startups'
  | 'secrets'
  | 'surprise'
  | 'css_franco'
  | 'cs_anglo'
  | 'cs_ontario'
  | 'ecoles_privees'
  | 'stats'
  | 'badges'
  | 'linkedin'
  | 'linkedin_network';
