import type { ContactRH } from '../types';

const s = (overrides: Partial<ContactRH> & Pick<ContactRH, 'id' | 'nom_entreprise' | 'secteur' | 'ville' | 'tags'>): ContactRH => ({
  liste: 'secrets',
  region: 'montreal',
  status: 'non_contacté',
  notes: '',
  priorite: 2,
  ...overrides,
});

export const secrets: ContactRH[] = [
  // ── SPORT & MOUVEMENT ──────────────────────────────────────────────────────
  s({ id: 'sc-001', nom_entreprise: 'Sport-Québec', secteur: 'Fédération sportive parapluie', ville: 'Montréal', priorite: 1, site_web: 'sportsquebec.com', tags: ['sport', 'fédération', 'jeunesse', 'priorité'] }),
  s({ id: 'sc-002', nom_entreprise: 'Loisir et Sport Outaouais (LSO)', secteur: 'Sport régional', ville: 'Gatineau', region: 'gatineau', site_web: 'lso.qc.ca', tags: ['sport', 'loisir', 'jeunesse', 'outaouais'] }),
  s({ id: 'sc-003', nom_entreprise: 'Regroupement Loisir Sport Québec', secteur: 'Sport communautaire', ville: 'Montréal', site_web: 'loisirquebec.com', tags: ['sport', 'loisir', 'communauté'] }),
  s({ id: 'sc-004', nom_entreprise: 'Kino-Québec', secteur: 'Programme gouvernemental activité physique', ville: 'Québec', region: 'quebec_ville', priorite: 1, site_web: 'kino-quebec.qc.ca', tags: ['sport', 'santé', 'jeunesse', 'gouvernement'] }),
  s({ id: 'sc-005', nom_entreprise: 'Les Offices jeunesse internationaux du Québec (LOJIQ)', secteur: 'Mobilité jeunesse', ville: 'Montréal', site_web: 'lojiq.org', tags: ['jeunesse', 'international', 'programme'] }),
  s({ id: 'sc-006', nom_entreprise: 'Fédération de basketball du Québec (FBQ)', secteur: 'Basketball / Sport', ville: 'Montréal', priorite: 1, site_web: 'basketball.qc.ca', tags: ['basketball', 'sport', 'jeunesse', 'fédération', 'cible_directe'] }),
  s({ id: 'sc-007', nom_entreprise: 'Basketball Québec — jeunesse/élite', secteur: 'Basketball', ville: 'Montréal', priorite: 1, tags: ['basketball', 'sport', 'jeunesse', 'élite', 'cible_directe'] }),
  s({ id: 'sc-008', nom_entreprise: 'Fédération québécoise du sport étudiant (FQSE)', secteur: 'Sport étudiant', ville: 'Montréal', priorite: 1, site_web: 'fqse.qc.ca', tags: ['sport', 'étudiant', 'jeunesse', 'fédération', 'cible_directe'] }),
  s({ id: 'sc-009', nom_entreprise: 'Réseau du sport étudiant du Québec (RSEQ)', secteur: 'Sport étudiant', ville: 'Montréal', priorite: 1, site_web: 'rseq.ca', tags: ['sport', 'étudiant', 'cégep', 'jeunesse', 'cible_directe'] }),
  s({ id: 'sc-010', nom_entreprise: 'Association régionale de soccer de Montréal', secteur: 'Soccer', ville: 'Montréal', tags: ['soccer', 'sport', 'jeunesse'] }),
  s({ id: 'sc-011', nom_entreprise: 'Sport Montréal', secteur: 'Sport urbain', ville: 'Montréal', priorite: 1, tags: ['sport', 'montréal', 'communauté', 'jeunesse'] }),
  s({ id: 'sc-012', nom_entreprise: 'Québec en Forme', secteur: 'Fondation jeunesse active', ville: 'Trois-Rivières', priorite: 1, site_web: 'quebecenforme.org', tags: ['sport', 'jeunesse', 'fondation', 'priorité'] }),

  // ── FONDATIONS & IMPACT ───────────────────────────────────────────────────
  s({ id: 'sc-013', nom_entreprise: 'Fondation du Grand Montréal', secteur: 'Philanthropie', ville: 'Montréal', site_web: 'fgmtl.org', tags: ['fondation', 'communauté', 'jeunesse'] }),
  s({ id: 'sc-014', nom_entreprise: 'Fondation Bon départ (Canadian Tire)', secteur: 'Sport jeunesse', ville: 'Montréal', priorite: 1, site_web: 'canadiantire.ca/fr/bon-depart.html', tags: ['sport', 'jeunesse', 'fondation', 'corporatif'] }),
  s({ id: 'sc-015', nom_entreprise: "Fondation l'Œuvre des Terrains de Jeux (OTJ)", secteur: 'Espaces jeunesse', ville: 'Québec', region: 'quebec_ville', site_web: 'otjquebec.org', tags: ['jeunesse', 'fondation', 'sport'] }),
  s({ id: 'sc-016', nom_entreprise: 'La Fondation Monique-Fitz-Back', secteur: 'Plein air jeunesse', ville: 'Montréal', site_web: 'fondationmoniquefitzback.ca', tags: ['plein_air', 'jeunesse', 'fondation'] }),
  s({ id: 'sc-017', nom_entreprise: 'Fondation Chagnon', secteur: 'Philanthropie jeunesse', ville: 'Montréal', priorite: 1, site_web: 'fondationchagnon.org', tags: ['fondation', 'jeunesse', 'sport', 'priorité'] }),
  s({ id: 'sc-018', nom_entreprise: 'Fondation Sylvie Daigle', secteur: 'Sport excellence', ville: 'Montréal', tags: ['sport', 'fondation', 'excellence'] }),
  s({ id: 'sc-019', nom_entreprise: 'TELUS Friendly Future Foundation', secteur: 'Technologie/jeunesse', ville: 'Montréal', priorite: 1, site_web: 'telus.com/fr/bc/internet/fondation', tags: ['tech', 'jeunesse', 'fondation', 'corporatif'] }),

  // ── MUNICIPALITÉS & PARCS ─────────────────────────────────────────────────
  s({ id: 'sc-020', nom_entreprise: 'Ville de Montréal — Division sports et loisirs', secteur: 'Municipal', ville: 'Montréal', priorite: 1, site_web: 'montreal.ca', tags: ['municipal', 'sport', 'loisir', 'jeunesse', 'priorité'] }),
  s({ id: 'sc-021', nom_entreprise: 'Ville de Québec — Direction sports et loisirs', secteur: 'Municipal', ville: 'Québec', region: 'quebec_ville', site_web: 'ville.quebec.qc.ca', tags: ['municipal', 'sport', 'loisir'] }),
  s({ id: 'sc-022', nom_entreprise: 'Ville de Gatineau — Division loisirs', secteur: 'Municipal', ville: 'Gatineau', region: 'gatineau', site_web: 'gatineau.ca', tags: ['municipal', 'sport', 'loisir'] }),
  s({ id: 'sc-023', nom_entreprise: 'Ville de Laval — Direction sports', secteur: 'Municipal', ville: 'Laval', site_web: 'laval.ca', tags: ['municipal', 'sport', 'jeunesse'] }),
  s({ id: 'sc-024', nom_entreprise: 'Ville de Longueuil — Direction sports', secteur: 'Municipal', ville: 'Longueuil', site_web: 'longueuil.quebec', tags: ['municipal', 'sport'] }),
  s({ id: 'sc-025', nom_entreprise: 'Ville de Sherbrooke — Division loisirs', secteur: 'Municipal', ville: 'Sherbrooke', region: 'autre', site_web: 'sherbrooke.ca', tags: ['municipal', 'sport', 'loisir'] }),
  s({ id: 'sc-026', nom_entreprise: 'Ville de Trois-Rivières — Division sports', secteur: 'Municipal', ville: 'Trois-Rivières', region: 'autre', site_web: 'v3r.net', tags: ['municipal', 'sport'] }),
  s({ id: 'sc-027', nom_entreprise: 'Ville de Saguenay — Division sports', secteur: 'Municipal', ville: 'Saguenay', region: 'autre', tags: ['municipal', 'sport'] }),

  // ── MÉDIAS SPÉCIALISÉS ────────────────────────────────────────────────────
  s({ id: 'sc-028', nom_entreprise: "L'Équipe Mag Québec", secteur: 'Médias sport', ville: 'Montréal', tags: ['médias', 'sport', 'presse'] }),
  s({ id: 'sc-029', nom_entreprise: 'RDS/TVA Sports', secteur: 'Médias sportifs TV', ville: 'Montréal', priorite: 1, tags: ['médias', 'sport', 'télévision', 'partenaire_potentiel'] }),
  s({ id: 'sc-030', nom_entreprise: 'Sportcom', secteur: 'Agence communication sport', ville: 'Montréal', site_web: 'sportcom.qc.ca', tags: ['sport', 'communications', 'agence'] }),
  s({ id: 'sc-031', nom_entreprise: 'Journal de Montréal (section sports)', secteur: 'Médias', ville: 'Montréal', site_web: 'journaldemontreal.com', tags: ['médias', 'sport', 'presse'] }),
  s({ id: 'sc-032', nom_entreprise: 'Le Droit Gatineau (section sports)', secteur: 'Médias', ville: 'Gatineau', region: 'gatineau', site_web: 'ledroit.com', tags: ['médias', 'sport', 'outaouais'] }),

  // ── CÉGEPS & SPORT ÉTUDIANT ───────────────────────────────────────────────
  s({ id: 'sc-033', nom_entreprise: 'Cégep de Sainte-Foy — Sport élite', secteur: 'Éducation/Sport', ville: 'Québec', region: 'quebec_ville', priorite: 1, site_web: 'cegep-ste-foy.qc.ca', tags: ['cégep', 'sport', 'élite', 'étudiant'] }),
  s({ id: 'sc-034', nom_entreprise: 'Cégep Limoilou — Sport étudiant', secteur: 'Éducation/Sport', ville: 'Québec', region: 'quebec_ville', site_web: 'cegeplimoilou.ca', tags: ['cégep', 'sport', 'étudiant'] }),
  s({ id: 'sc-035', nom_entreprise: 'Cégep de Sherbrooke — Sport étudiant', secteur: 'Éducation/Sport', ville: 'Sherbrooke', region: 'autre', site_web: 'cegepsherbrooke.qc.ca', tags: ['cégep', 'sport', 'étudiant'] }),
  s({ id: 'sc-036', nom_entreprise: 'Cégep Ahuntsic — Sport étudiant', secteur: 'Éducation/Sport', ville: 'Montréal', priorite: 1, site_web: 'collegeahuntsic.qc.ca', tags: ['cégep', 'sport', 'étudiant', 'priorité'] }),
  s({ id: 'sc-037', nom_entreprise: 'Cégep du Vieux Montréal — Sport', secteur: 'Éducation/Sport', ville: 'Montréal', site_web: 'cvm.qc.ca', tags: ['cégep', 'sport', 'étudiant'] }),
  s({ id: 'sc-038', nom_entreprise: 'Cégep de Saint-Laurent — Sport', secteur: 'Éducation/Sport', ville: 'Montréal', site_web: 'cegepsaintlaurent.qc.ca', tags: ['cégep', 'sport', 'étudiant'] }),
  s({ id: 'sc-039', nom_entreprise: "Cégep de l'Outaouais — Sport", secteur: 'Éducation/Sport', ville: 'Gatineau', region: 'gatineau', site_web: 'cegepoutaouais.qc.ca', tags: ['cégep', 'sport', 'étudiant', 'gatineau'] }),

  // ── ACHETEURS SURPRISES ───────────────────────────────────────────────────
  s({ id: 'sc-040', nom_entreprise: 'YMCA du Québec', secteur: 'Loisirs / Sport communautaire', ville: 'Montréal', priorite: 1, site_web: 'ymcaquebec.org', tags: ['sport', 'jeunesse', 'communauté', 'priorité'] }),
  s({ id: 'sc-041', nom_entreprise: 'Centres de loisirs de Montréal (fédération)', secteur: 'Loisirs communautaires', ville: 'Montréal', tags: ['loisir', 'communauté', 'jeunesse'] }),
  s({ id: 'sc-042', nom_entreprise: 'Scouts Canada (région QC)', secteur: 'Jeunesse', ville: 'Montréal', site_web: 'scouts.ca', tags: ['jeunesse', 'communauté', 'plein_air'] }),
  s({ id: 'sc-043', nom_entreprise: 'Maisons des jeunes du Québec (RMJQ)', secteur: 'Jeunesse communautaire', ville: 'Montréal', site_web: 'rmjq.org', tags: ['jeunesse', 'communauté'] }),
  s({ id: 'sc-044', nom_entreprise: 'Boys and Girls Clubs of Quebec', secteur: 'Jeunesse communautaire', ville: 'Montréal', priorite: 1, site_web: 'bgcquebec.com', tags: ['jeunesse', 'sport', 'communauté', 'priorité'] }),
  s({ id: 'sc-045', nom_entreprise: 'Fondation Martin-Matte', secteur: 'Philanthropie sportive', ville: 'Montréal', site_web: 'fondationmartinmatte.com', tags: ['fondation', 'sport', 'communauté'] }),
  s({ id: 'sc-046', nom_entreprise: 'Réseau des carrefours jeunesse-emploi du Québec', secteur: 'Jeunesse / Emploi', ville: 'Montréal', site_web: 'cjereseau.org', tags: ['jeunesse', 'emploi', 'communauté'] }),
  s({ id: 'sc-047', nom_entreprise: 'Jeunes en tête', secteur: 'Santé mentale/sport jeunesse', ville: 'Montréal', priorite: 1, site_web: 'jeunestete.com', tags: ['jeunesse', 'santé_mentale', 'sport', 'priorité'] }),
  s({ id: 'sc-048', nom_entreprise: 'Club Optimiste Canada (région QC)', secteur: 'Jeunesse communautaire', ville: 'Montréal', site_web: 'optimist.org', tags: ['jeunesse', 'communauté'] }),
  s({ id: 'sc-049', nom_entreprise: 'La Maisonnée', secteur: 'Centre communautaire', ville: 'Montréal', tags: ['communauté', 'jeunesse', 'sport'] }),
  s({ id: 'sc-050', nom_entreprise: 'Hockey Now Montréal', secteur: 'Médias sport', ville: 'Montréal', tags: ['médias', 'hockey', 'sport'] }),
];
