import Discord = require('discord.js');
const bot = new Discord.Client();
import http = require('http');

import { config } from './config';

const serverStatusURL = 'http://mcapi.us/server/status?ip=' + config.serverDomain;

bot.login(config.botToken);

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.content === 'live?') {
		get(serverStatusURL).then(response => {
			if(response.status === 'success' && response.online) {
				msg.reply('Yes!');
			} else {
				msg.reply('No :(');
			}
		});
  }
});

function get(url: string): Promise<any> {
	return new Promise(resolve => {
		http.get(url, res => {
			let data = '';

			res.on('data', chunk => {
				data += chunk;
			});

			res.on('end', () => {
				resolve(JSON.parse(data));
			});
		});
	});
}
