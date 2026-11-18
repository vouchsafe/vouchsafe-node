import { FlowTemplate, flowTemplate } from '../../../../types/FlowTemplate';

export interface CreateTeamInput {
  'X-Partner-Token': string;
  name: string;
  public_name?: string;
  logo_url?: string;
  team_admin_emails: string[];
  flow_template?: FlowTemplate;
}
