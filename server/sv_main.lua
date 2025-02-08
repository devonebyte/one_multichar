local oxmysql = exports.oxmysql

RegisterServerEvent('fivem:saveCharacter')
AddEventHandler('fivem:saveCharacter', function(data)
    local src = source
    local license = GetPlayerIdentifier(src, 1)
    local citizenId = data.citizenId
    local fingerprintId = data.fingerprintId or "N/A"
    local firstname = data.firstname
    local lastname = data.lastname
    local dob = data.dob
    local sex = data.sex
    local appearance = json.encode(data.appearance)

    oxmysql:insert([[
        INSERT INTO players (disabled, staticId, charId, serverId, citizenId, fingerprintId, license, firstname, lastname, dob, sex, appearance, dead, nationality, charinfo, money, inventory, job, job_grade, position, created, last_seen)
        VALUES (0, NULL, NULL, NULL, ?, ?, ?, ?, ?, ?, ?, ?, 0, NULL, '{}', '{}', '{}', NULL, NULL, '{}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ]], {
        citizenId = citizenId,
        fingerprintId = fingerprintId,
        license = license,
        firstname = firstname,
        lastname = lastname,
        dob = dob,
        sex = sex,
        appearance = appearance
    }, function(id)
        if id then
            TriggerClientEvent('chat:addMessage', src, { args = { 'SYSTEM', 'Character created successfully!' } })
        else
            TriggerClientEvent('chat:addMessage', src, { args = { 'SYSTEM', 'Failed to create character.' } })
        end
    end)
end)

RegisterServerEvent('fivem:getCharacters')
AddEventHandler('fivem:getCharacters', function()
    local src = source
    local license = GetPlayerIdentifier(src, 1)

    oxmysql:execute('SELECT * FROM players WHERE license = ? AND disabled = 0', { license }, function(characters)
        TriggerClientEvent('fivem:showCharacters', src, characters)
    end)
end)

RegisterServerEvent('fivem:selectCharacter')
AddEventHandler('fivem:selectCharacter', function(charId)
    local src = source
    oxmysql:execute('SELECT * FROM players WHERE charId = ?', { charId }, function(result)
        if result[1] then
            local character = result[1]
            TriggerClientEvent('chat:addMessage', src, { args = { 'SYSTEM', 'Character selected: ' .. character.firstname .. ' ' .. character.lastname } })
            -- TODO: Přidej logiku pro načítání postavy (např. pozice, inventář, atd.)
        end
    end)
end)
