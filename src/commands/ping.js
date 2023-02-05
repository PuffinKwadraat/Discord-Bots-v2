const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Test if the bot responds.'),
	async execute(interaction) {
		const modules = require('..');
		const snowflake = interaction.user.id;
		const list = ["Yep!", "Here!", "Ready!", "Awake!", "I'm here!", "Yes!", "Yeah!", "Sure!", "Hello!", "Hey!"];
		const random = list[Math.floor(Math.random() * list.length)];
		await interaction.reply(random);

		modules.database.promise()
			.execute(`UPDATE user SET commands_used = commands_used + 1 WHERE snowflake = '${snowflake}'`)
			.catch(err => {
				return console.log("Command usage increase unsuccessful, user do not have an account yet.");
			});
	},
};