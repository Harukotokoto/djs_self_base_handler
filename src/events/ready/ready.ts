import { Event } from '../../lib/modules/Event';
import { client } from '../../index';

export default new Event('ready', async () => {
  client.Logger.info(`${client.user?.tag} is now ready!`);
});
