const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warn someone that breakes the rules.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option => option.setName('target').setDescription('The person you want to warn.').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the warning.').setRequired(false)),
    async execute(interaction) {
        const modules = require('..');
        const snowflake = interaction.user.id;
        const target = interaction.options.getUser('target').id;
        const reason = interaction.options.getString('reason') ?? 'No reason provided';

        modules.database.promise()
            .execute(`UPDATE user SET warnings = (warnings + 1) WHERE snowflake = '${target}'`)
            .then(async () => {
                await interaction.reply(`User <@${target}> has been warned for: ` + "`" + reason + "`.");
            }).catch(async err => {
                console.log(err)
                await interaction.reply('Something went wrong while warning this user.');
            });

        modules.database.promise()
            .execute(`UPDATE user SET commands_used = commands_used + 1 WHERE snowflake = '${snowflake}'`)
            .catch(err => {
				return console.log("Command usage increase unsuccessful, user do not have an account yet.");
            });
    },
};