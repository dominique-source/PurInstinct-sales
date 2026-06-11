import type { EtablissementScolaire } from '../types';

const css = (overrides: Partial<EtablissementScolaire> & Pick<EtablissementScolaire, 'id' | 'nom' | 'region' | 'ville_siege'>): EtablissementScolaire => ({
  type: 'css_francophone',
  province: 'QC',
  status: 'non_contacté',
  notes: '',
  priorite: 2,
  tags: ['css', 'francophone', 'sport', 'jeunesse'],
  ...overrides,
});

const csa = (overrides: Partial<EtablissementScolaire> & Pick<EtablissementScolaire, 'id' | 'nom' | 'region' | 'ville_siege'>): EtablissementScolaire => ({
  type: 'cs_anglophone',
  province: 'QC',
  status: 'non_contacté',
  notes: '',
  priorite: 2,
  tags: ['cs', 'anglophone', 'sport', 'jeunesse'],
  ...overrides,
});

const cson = (overrides: Partial<EtablissementScolaire> & Pick<EtablissementScolaire, 'id' | 'nom' | 'region' | 'ville_siege'>): EtablissementScolaire => ({
  type: 'cs_ontario',
  province: 'ON',
  status: 'non_contacté',
  notes: '',
  priorite: 2,
  tags: ['ontario', 'gatineau', 'sport', 'jeunesse'],
  ...overrides,
});

const priv = (overrides: Partial<EtablissementScolaire> & Pick<EtablissementScolaire, 'id' | 'nom' | 'region' | 'ville_siege'>): EtablissementScolaire => ({
  type: 'ecole_privee',
  province: 'QC',
  status: 'non_contacté',
  notes: '',
  priorite: 2,
  tags: ['privé', 'feep', 'sport', 'jeunesse'],
  ...overrides,
});

// ── CSS FRANCOPHONES ──────────────────────────────────────────────────────────

export const cssFrancophones: EtablissementScolaire[] = [
  // Capitale-Nationale
  css({ id: 'css-001', nom: 'CSS de la Capitale', region: 'Capitale-Nationale', ville_siege: 'Québec', site_web: 'csscapitale.gouv.qc.ca' }),
  css({ id: 'css-002', nom: 'CSS des Découvreurs', region: 'Capitale-Nationale', ville_siege: 'Québec (Sainte-Foy)', site_web: 'cssdecouvreurs.gouv.qc.ca' }),
  css({ id: 'css-003', nom: 'CSS des Premières-Seigneuries', region: 'Capitale-Nationale', ville_siege: 'Beauport', site_web: 'csspremieresseigneuries.gouv.qc.ca' }),
  css({ id: 'css-004', nom: 'CSS de Charlevoix', region: 'Capitale-Nationale', ville_siege: 'Baie-Saint-Paul' }),
  css({ id: 'css-005', nom: 'CSS de Portneuf', region: 'Capitale-Nationale', ville_siege: 'Donnacona' }),
  // Chaudière-Appalaches
  css({ id: 'css-006', nom: 'CSS de la Beauce-Etchemin', region: 'Chaudière-Appalaches', ville_siege: 'Saint-Georges' }),
  css({ id: 'css-007', nom: 'CSS de la Côte-du-Sud', region: 'Chaudière-Appalaches', ville_siege: 'Montmagny' }),
  css({ id: 'css-008', nom: 'CSS des Appalaches', region: 'Chaudière-Appalaches', ville_siege: 'Thetford Mines' }),
  css({ id: 'css-009', nom: 'CSS des Navigateurs', region: 'Chaudière-Appalaches', ville_siege: 'Lévis' }),
  // Bas-Saint-Laurent
  css({ id: 'css-010', nom: 'CSS des Phares', region: 'Bas-Saint-Laurent', ville_siege: 'Rimouski' }),
  css({ id: 'css-011', nom: 'CSS des Monts-et-Marées', region: 'Bas-Saint-Laurent', ville_siege: 'Sainte-Anne-des-Monts' }),
  css({ id: 'css-012', nom: 'CSS de Kamouraska–Rivière-du-Loup', region: 'Bas-Saint-Laurent', ville_siege: 'Rivière-du-Loup' }),
  css({ id: 'css-013', nom: 'CSS du Fleuve-et-des-Lacs', region: 'Bas-Saint-Laurent', ville_siege: 'Témiscouata' }),
  // Saguenay–Lac-Saint-Jean
  css({ id: 'css-014', nom: 'CSS de la Jonquière', region: 'Saguenay–Lac-Saint-Jean', ville_siege: 'Jonquière' }),
  css({ id: 'css-015', nom: 'CSS des Rives-du-Saguenay', region: 'Saguenay–Lac-Saint-Jean', ville_siege: 'Chicoutimi' }),
  css({ id: 'css-016', nom: 'CSS du Pays-des-Bleuets', region: 'Saguenay–Lac-Saint-Jean', ville_siege: 'Roberval' }),
  css({ id: 'css-017', nom: 'CSS du Lac-Saint-Jean', region: 'Saguenay–Lac-Saint-Jean', ville_siege: 'Alma' }),
  // Mauricie
  css({ id: 'css-018', nom: 'CSS du Chemin-du-Roy', region: 'Mauricie', ville_siege: 'Trois-Rivières' }),
  css({ id: 'css-019', nom: "CSS de l'Énergie", region: 'Mauricie', ville_siege: 'Shawinigan' }),
  // Estrie
  css({ id: 'css-020', nom: 'CSS de la Région-de-Sherbrooke', region: 'Estrie', ville_siege: 'Sherbrooke' }),
  css({ id: 'css-021', nom: 'CSS des Hauts-Cantons', region: 'Estrie', ville_siege: 'Cookshire' }),
  css({ id: 'css-022', nom: 'CSS des Sommets', region: 'Estrie', ville_siege: 'Magog' }),
  // Montréal
  css({ id: 'css-023', nom: 'CSS Marguerite-Bourgeoys', region: 'Montréal', ville_siege: 'Montréal (ouest)' }),
  css({ id: 'css-024', nom: 'CSS de Montréal (CSSDM)', region: 'Montréal', ville_siege: 'Montréal', priorite: 1, nb_eleves: 80000, tags: ['css', 'francophone', 'sport', 'jeunesse', 'priorité', 'grand'] }),
  css({ id: 'css-025', nom: 'CSS de la Pointe-de-l\'Île', region: 'Montréal', ville_siege: 'Montréal (est)' }),
  // Laval
  css({ id: 'css-026', nom: 'CSS de Laval', region: 'Laval', ville_siege: 'Laval' }),
  // Lanaudière
  css({ id: 'css-027', nom: 'CSS des Affluents', region: 'Lanaudière', ville_siege: 'Repentigny' }),
  css({ id: 'css-028', nom: 'CSS des Samares', region: 'Lanaudière', ville_siege: 'Joliette' }),
  // Laurentides
  css({ id: 'css-029', nom: 'CSS de la Seigneurie-des-Mille-Îles', region: 'Laurentides', ville_siege: 'Mirabel' }),
  css({ id: 'css-030', nom: 'CSS de la Rivière-du-Nord', region: 'Laurentides', ville_siege: 'Saint-Jérôme' }),
  css({ id: 'css-031', nom: 'CSS des Laurentides', region: 'Laurentides', ville_siege: 'Mont-Laurier' }),
  css({ id: 'css-032', nom: 'CSS Pierre-Neveu', region: 'Laurentides', ville_siege: 'Mont-Laurier' }),
  // Montérégie
  css({ id: 'css-033', nom: 'CSS Marie-Victorin', region: 'Montérégie', ville_siege: 'Longueuil' }),
  css({ id: 'css-034', nom: 'CSS des Grandes-Seigneuries', region: 'Montérégie', ville_siege: 'La Prairie' }),
  css({ id: 'css-035', nom: 'CSS des Patriotes', region: 'Montérégie', ville_siege: 'Beloeil' }),
  css({ id: 'css-036', nom: 'CSS de Saint-Hyacinthe', region: 'Montérégie', ville_siege: 'Saint-Hyacinthe' }),
  css({ id: 'css-037', nom: 'CSS du Val-des-Cerfs', region: 'Montérégie', ville_siege: 'Granby' }),
  css({ id: 'css-038', nom: 'CSS de la Vallée-des-Tisserands', region: 'Montérégie', ville_siege: 'Salaberry-de-Valleyfield' }),
  css({ id: 'css-039', nom: 'CSS des Hautes-Rivières', region: 'Montérégie', ville_siege: 'Saint-Jean-sur-Richelieu' }),
  css({ id: 'css-040', nom: 'CSS de la Sorel-Tracy', region: 'Montérégie', ville_siege: 'Sorel-Tracy' }),
  // Outaouais
  css({ id: 'css-041', nom: 'CSS au Cœur-des-Vallées', region: 'Outaouais', ville_siege: 'Buckingham' }),
  css({ id: 'css-042', nom: 'CSS des Draveurs', region: 'Outaouais', ville_siege: 'Gatineau', priorite: 1, tags: ['css', 'francophone', 'sport', 'jeunesse', 'outaouais', 'priorité'] }),
  css({ id: 'css-043', nom: 'CSS des Hauts-Bois-de-l\'Outaouais', region: 'Outaouais', ville_siege: 'Maniwaki' }),
  css({ id: 'css-044', nom: 'CSS des Portages-de-l\'Outaouais', region: 'Outaouais', ville_siege: 'Gatineau', priorite: 1, tags: ['css', 'francophone', 'sport', 'jeunesse', 'outaouais', 'priorité'] }),
  // Abitibi-Témiscamingue
  css({ id: 'css-045', nom: "CSS de l'Or-et-des-Bois", region: 'Abitibi-Témiscamingue', ville_siege: "Val-d'Or" }),
  css({ id: 'css-046', nom: 'CSS de Rouyn-Noranda', region: 'Abitibi-Témiscamingue', ville_siege: 'Rouyn-Noranda' }),
  css({ id: 'css-047', nom: 'CSS du Lac-Abitibi', region: 'Abitibi-Témiscamingue', ville_siege: 'La Sarre' }),
  css({ id: 'css-048', nom: 'CSS Harricana', region: 'Abitibi-Témiscamingue', ville_siege: 'Amos' }),
  css({ id: 'css-049', nom: 'CSS du Lac-Témiscamingue', region: 'Abitibi-Témiscamingue', ville_siege: 'Ville-Marie' }),
  // Côte-Nord
  css({ id: 'css-050', nom: "CSS de l'Estuaire", region: 'Côte-Nord', ville_siege: 'Sept-Îles' }),
  css({ id: 'css-051', nom: 'CSS du Fer', region: 'Côte-Nord', ville_siege: 'Port-Cartier' }),
  css({ id: 'css-052', nom: 'CSS de la Moyenne-Côte-Nord', region: 'Côte-Nord', ville_siege: 'Sept-Îles' }),
  // Gaspésie / Îles-de-la-Madeleine
  css({ id: 'css-053', nom: 'CSS des Chic-Chocs', region: 'Gaspésie–Îles-de-la-Madeleine', ville_siege: 'New Carlisle' }),
  css({ id: 'css-054', nom: 'CSS René-Lévesque', region: 'Gaspésie–Îles-de-la-Madeleine', ville_siege: 'Chandler' }),
  css({ id: 'css-055', nom: 'CSS des Îles', region: 'Gaspésie–Îles-de-la-Madeleine', ville_siege: 'Les Îles-de-la-Madeleine' }),
  // Nord-du-Québec
  css({ id: 'css-056', nom: 'CSS de la Baie-James', region: 'Nord-du-Québec', ville_siege: 'Chibougamau' }),
  // Centre-du-Québec
  css({ id: 'css-057', nom: 'CSS de la Riveraine', region: 'Centre-du-Québec', ville_siege: 'Nicolet' }),
  css({ id: 'css-058', nom: 'CSS des Bois-Francs', region: 'Centre-du-Québec', ville_siege: 'Victoriaville' }),
  // Concordia University (bonus)
  css({ id: 'css-059', nom: 'Concordia University', region: 'Montréal', ville_siege: 'Montréal', site_web: 'concordia.ca', tags: ['université', 'anglophone', 'sport', 'jeunesse'] }),
];

// ── CS ANGLOPHONES (QC) ───────────────────────────────────────────────────────

export const csAnglophones: EtablissementScolaire[] = [
  csa({ id: 'csa-001', nom: 'CS Eastern Shores', region: 'Gaspésie–Côte-Nord', ville_siege: 'New Carlisle', site_web: 'easternshores.qc.ca' }),
  csa({ id: 'csa-002', nom: 'CS Eastern Townships', region: 'Estrie', ville_siege: 'Sherbrooke', site_web: 'etsb.qc.ca' }),
  csa({ id: 'csa-003', nom: 'CS English-Montreal', region: 'Montréal', ville_siege: 'Montréal', site_web: 'emsb.qc.ca', priorite: 1, tags: ['cs', 'anglophone', 'sport', 'jeunesse', 'priorité'] }),
  csa({ id: 'csa-004', nom: 'CS Lester-B.-Pearson', region: 'Laval/West-Island', ville_siege: 'Dorval', site_web: 'lbpsb.qc.ca', priorite: 1, tags: ['cs', 'anglophone', 'sport', 'jeunesse', 'priorité'] }),
  csa({ id: 'csa-005', nom: 'CS Central Québec', region: 'Québec/Mauricie/Saguenay', ville_siege: 'Québec', site_web: 'cqsb.qc.ca' }),
  csa({ id: 'csa-006', nom: 'CS Sir-Wilfrid-Laurier', region: 'Laval/Laurentides', ville_siege: 'Rosemère', site_web: 'swlauriersb.ca', priorite: 1, tags: ['cs', 'anglophone', 'sport', 'jeunesse', 'priorité'] }),
  csa({ id: 'csa-007', nom: 'CS Western Québec', region: 'Outaouais/Abitibi', ville_siege: 'Gatineau', site_web: 'wqsb.qc.ca', priorite: 1, tags: ['cs', 'anglophone', 'sport', 'jeunesse', 'outaouais', 'priorité'] }),
  csa({ id: 'csa-008', nom: 'CS Crie', region: 'Nord-du-Québec', ville_siege: 'Chisasibi', type: 'cs_statut_particulier', tags: ['cs', 'autochtone', 'sport'] }),
  csa({ id: 'csa-009', nom: 'CS Kativik', region: 'Nunavik', ville_siege: 'Kuujjuaq', type: 'cs_statut_particulier', tags: ['cs', 'autochtone', 'nord'] }),
];

// ── ONTARIO / OTTAWA-GATINEAU ─────────────────────────────────────────────────

export const csOntario: EtablissementScolaire[] = [
  cson({ id: 'con-001', nom: 'Conseil des écoles catholiques du Centre-Est (CECCE)', region: 'Ottawa-Gatineau', ville_siege: 'Ottawa', site_web: 'ecolecatholique.ca', priorite: 1, tags: ['ontario', 'francophone', 'catholique', 'sport', 'jeunesse', 'priorité'] }),
  cson({ id: 'con-002', nom: 'Conseil des écoles publiques de l\'Est de l\'Ontario (CEPEO)', region: 'Ottawa-Gatineau', ville_siege: 'Ottawa', site_web: 'cepeo.on.ca', priorite: 1, tags: ['ontario', 'francophone', 'sport', 'jeunesse', 'priorité'] }),
  cson({ id: 'con-003', nom: 'Ottawa-Carleton District School Board (OCDSB)', region: 'Ottawa', ville_siege: 'Ottawa', site_web: 'ocdsb.ca', tags: ['ontario', 'anglophone', 'sport', 'jeunesse'] }),
  cson({ id: 'con-004', nom: 'Ottawa Catholic School Board (OCSB)', region: 'Ottawa', ville_siege: 'Ottawa', site_web: 'ocsb.ca', tags: ['ontario', 'anglophone', 'catholique', 'sport'] }),
  cson({ id: 'con-005', nom: 'Conseil scolaire catholique Providence', region: 'Ottawa', ville_siege: 'Windsor/Ottawa', site_web: 'cscprovidence.ca', tags: ['ontario', 'francophone', 'catholique'] }),
  cson({ id: 'con-006', nom: 'Conseil scolaire Viamonde', region: 'Toronto/Ottawa', ville_siege: 'Toronto', site_web: 'csviamonde.ca', tags: ['ontario', 'francophone', 'sport'] }),
];

// ── ÉCOLES PRIVÉES FEEP ───────────────────────────────────────────────────────

export const ecolesPrivees: EtablissementScolaire[] = [
  // Québec Ville / Capitale-Nationale
  priv({ id: 'prv-001', nom: 'Collège des Jésuites', region: 'Capitale-Nationale', ville_siege: 'Québec' }),
  priv({ id: 'prv-002', nom: 'Collège François-de-Laval', region: 'Capitale-Nationale', ville_siege: 'Québec' }),
  priv({ id: 'prv-003', nom: 'Collège Saint-Charles-Garnier', region: 'Capitale-Nationale', ville_siege: 'Québec', priorite: 1, tags: ['privé', 'feep', 'sport', 'jeunesse', 'priorité'] }),
  priv({ id: 'prv-004', nom: 'École des Ursulines de Québec', region: 'Capitale-Nationale', ville_siege: 'Québec' }),
  priv({ id: 'prv-005', nom: 'Externat Saint-Jean-Eudes', region: 'Capitale-Nationale', ville_siege: 'Québec', priorite: 1, tags: ['privé', 'feep', 'sport', 'jeunesse', 'priorité'] }),
  priv({ id: 'prv-006', nom: 'Séminaire de Québec', region: 'Capitale-Nationale', ville_siege: 'Québec' }),
  priv({ id: 'prv-007', nom: 'Collège de Champagny', region: 'Capitale-Nationale', ville_siege: 'Québec' }),
  priv({ id: 'prv-008', nom: 'Institut St-Joseph', region: 'Capitale-Nationale', ville_siege: 'Québec' }),
  priv({ id: 'prv-009', nom: 'Académie des Gouverneurs', region: 'Capitale-Nationale', ville_siege: 'Québec' }),
  priv({ id: 'prv-010', nom: 'Collège Stanislas (succursale Québec)', region: 'Capitale-Nationale', ville_siege: 'Québec' }),
  // Chaudière-Appalaches / Lévis
  priv({ id: 'prv-011', nom: 'Collège de Lévis', region: 'Chaudière-Appalaches', ville_siege: 'Lévis', priorite: 1, tags: ['privé', 'feep', 'sport', 'jeunesse', 'priorité'] }),
  priv({ id: 'prv-012', nom: 'Campus Notre-Dame-de-Foy', region: 'Capitale-Nationale', ville_siege: 'Saint-Augustin' }),
  // Montréal & Grand Montréal
  priv({ id: 'prv-013', nom: 'Collège André-Grasset', region: 'Montréal', ville_siege: 'Montréal' }),
  priv({ id: 'prv-014', nom: 'Collège Brébeuf', region: 'Montréal', ville_siege: 'Montréal', priorite: 1, tags: ['privé', 'feep', 'sport', 'jeunesse', 'élite', 'priorité'] }),
  priv({ id: 'prv-015', nom: 'Collège de Montréal', region: 'Montréal', ville_siege: 'Montréal', priorite: 1, tags: ['privé', 'feep', 'sport', 'jeunesse', 'priorité'] }),
  priv({ id: 'prv-016', nom: 'Collège Mont-Saint-Louis', region: 'Montréal', ville_siege: 'Montréal', priorite: 1, tags: ['privé', 'feep', 'sport', 'jeunesse', 'priorité'] }),
  priv({ id: 'prv-017', nom: 'Collège Notre-Dame', region: 'Montréal', ville_siege: 'Montréal', priorite: 1, tags: ['privé', 'feep', 'sport', 'jeunesse', 'priorité'] }),
  priv({ id: 'prv-018', nom: 'Collège Regina Assumpta', region: 'Montréal', ville_siege: 'Montréal' }),
  priv({ id: 'prv-019', nom: 'Collège Reine-Marie', region: 'Montréal', ville_siege: 'Montréal' }),
  priv({ id: 'prv-020', nom: 'Collège Sainte-Anne (Lachine)', region: 'Montréal', ville_siege: 'Lachine' }),
  priv({ id: 'prv-021', nom: 'Collège Sainte-Marcelline', region: 'Montréal', ville_siege: 'Montréal' }),
  priv({ id: 'prv-022', nom: 'Académie Saint-Louis', region: 'Montréal', ville_siege: 'Montréal', priorite: 1, tags: ['privé', 'feep', 'sport', 'jeunesse', 'priorité'] }),
  priv({ id: 'prv-023', nom: 'Collège Stanislas', region: 'Montréal', ville_siege: 'Montréal', priorite: 1, tags: ['privé', 'feep', 'bilingue', 'sport', 'jeunesse', 'priorité'] }),
  priv({ id: 'prv-024', nom: 'École Secondaire Charlemagne', region: 'Montréal', ville_siege: 'Pierrefonds' }),
  priv({ id: 'prv-025', nom: 'Collège Français (secondaire)', region: 'Montréal', ville_siege: 'Montréal' }),
  priv({ id: 'prv-026', nom: 'Collège International Marie de France', region: 'Montréal', ville_siege: 'Montréal' }),
  priv({ id: 'prv-027', nom: 'Académie Dunton', region: 'Montréal', ville_siege: 'Montréal' }),
  priv({ id: 'prv-028', nom: 'École Hébraïque Maimonide', region: 'Montréal', ville_siege: 'Côte-Saint-Luc' }),
  priv({ id: 'prv-029', nom: 'Collège Esther-Blondin', region: 'Lanaudière', ville_siege: 'Saint-Jacques', priorite: 1, tags: ['privé', 'feep', 'sport', 'jeunesse', 'priorité'] }),
  priv({ id: 'prv-030', nom: 'Collège Durocher Saint-Lambert', region: 'Montérégie', ville_siege: 'Saint-Lambert', priorite: 1, tags: ['privé', 'feep', 'sport', 'jeunesse', 'priorité'] }),
  priv({ id: 'prv-031', nom: 'École Secondaire Mont-de-LaSalle', region: 'Montréal', ville_siege: 'Laval' }),
  priv({ id: 'prv-032', nom: 'Collège Notre-Dame-de-Lourdes', region: 'Montérégie', ville_siege: 'Longueuil', priorite: 1, tags: ['privé', 'feep', 'sport', 'jeunesse', 'priorité'] }),
  // Laval
  priv({ id: 'prv-033', nom: 'Collège Laval', region: 'Laval', ville_siege: 'Laval', priorite: 1, tags: ['privé', 'feep', 'sport', 'jeunesse', 'priorité'] }),
  priv({ id: 'prv-034', nom: 'Académie Lavalloise', region: 'Laval', ville_siege: 'Laval' }),
  priv({ id: 'prv-035', nom: "Académie d'Aquin", region: 'Laval', ville_siege: 'Laval' }),
  // Rive-Sud / Montérégie
  priv({ id: 'prv-036', nom: 'Collège Saint-Paul', region: 'Montérégie', ville_siege: 'Varennes', priorite: 1, tags: ['privé', 'feep', 'sport', 'jeunesse', 'priorité'] }),
  priv({ id: 'prv-037', nom: 'Collège Antoine-Girouard', region: 'Montérégie', ville_siege: 'Saint-Hyacinthe' }),
  priv({ id: 'prv-038', nom: 'Séminaire de Saint-Jean', region: 'Montérégie', ville_siege: 'Saint-Jean-sur-Richelieu' }),
  // Laurentides / Lanaudière
  priv({ id: 'prv-039', nom: 'Collège Saint-Sacrement', region: 'Lanaudière', ville_siege: 'Terrebonne' }),
  priv({ id: 'prv-040', nom: 'Académie Lafontaine', region: 'Laurentides', ville_siege: 'Saint-Jérôme' }),
  // Outaouais
  priv({ id: 'prv-041', nom: "École secondaire de l'Île", region: 'Outaouais', ville_siege: 'Gatineau', priorite: 1, tags: ['privé', 'gatineau', 'sport', 'jeunesse'] }),
  priv({ id: 'prv-042', nom: 'École Séraphine', region: 'Outaouais', ville_siege: 'Gatineau' }),
  // Estrie
  priv({ id: 'prv-043', nom: 'Collège du Sacré-Cœur', region: 'Estrie', ville_siege: 'Sherbrooke' }),
  priv({ id: 'prv-044', nom: 'École secondaire Mont-Sacré-Cœur', region: 'Estrie', ville_siege: 'Granby' }),
];
