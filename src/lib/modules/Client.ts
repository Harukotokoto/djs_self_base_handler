import {
  EmbedFooterData,
  Client as DiscordClient,
  ClientEvents,
  ClientOptions,
  Collection,
  Message,
  PartialMessage,
} from 'discord.js-selfbot-v13';
import { promisify } from 'util';
import glob from 'glob';
import { Event } from './Event';
import { CommandType } from '../interfaces/Command';
import { Logger } from './classes/Logger';
import mongoose from 'mongoose';
import process from 'process';
import moment from 'moment';

const globPromise = promisify(glob);

export class Client extends DiscordClient {
  public commands: Collection<string, CommandType> = new Collection<
    string,
    CommandType
  >();

  public Logger = new Logger();

  public constructor(options?: ClientOptions) {
    super(options);
  }

  public footer = (): EmbedFooterData => {
    const user = this.users.cache.get('1004365048887660655');
    return {
      text: `Produced by ${user?.displayName}`,
      iconURL: user?.avatarURL() as string,
    };
  };

  public start(): void {
    this.login(process.env.CLIENT_TOKEN).then(() => {
      this.Logger.info('Logged in successfully');
    });

    this.register_modules().then(() =>
      this.Logger.info('Modules loaded successfully'),
    );

    mongoose
      .connect(process.env.DATABASE_CONNECTION_URI)
      .then(() => this.Logger.info('Successfully connected to database'));
  }

  public async importFile<T>(filePath: string): Promise<T> {
    return (await import(filePath))?.default;
  }

  public async loadEvents() {
    const eventFiles = await globPromise(
      `${__dirname}/../../events/**/*{.ts,.js}`,
    );
    for (const filePath of eventFiles) {
      const event = await this.importFile<Event<keyof ClientEvents>>(filePath);
      if (event && 'event' in event) {
        this.on(event.event, event.run);
      }
    }
  }

  public async register_modules() {
    const commands: CommandType[] = [];

    const commandFiles = await globPromise(
      __dirname + `/../../commands/*/*{.ts,.js}`,
    );

    for (const filePath of commandFiles) {
      const command = await this.importFile<CommandType>(filePath);
      if (!command || !('name' in command)) continue;

      this.commands.set(command.name, command);
      commands.push(command);
    }

    await this.loadEvents();
  }
}
