local characterCreating = false
local previewCoords = vector3(-1044.85, -2749.15, 21.35) -- Nastav souřadnice podle potřeby
local previewHeading = 180.0 -- Směr, kam postava kouká

-- Funkce pro zobrazení UI
RegisterNetEvent('character_creator:openUI', function()
    if not characterCreating then
        characterCreating = true

        -- Teleport hráče na preview souřadnice
        SetEntityCoords(PlayerPedId(), previewCoords.x, previewCoords.y, previewCoords.z)
        SetEntityHeading(PlayerPedId(), previewHeading)
        FreezeEntityPosition(PlayerPedId(), true)
        SetEntityVisible(PlayerPedId(), false, false)
        SetNuiFocus(true, true)
        SendNUIMessage({
            action = "showUI"
        })
    end
end)

-- Funkce pro zavření UI
RegisterNUICallback('closeUI', function(_, cb)
    characterCreating = false
    SetNuiFocus(false, false)
    FreezeEntityPosition(PlayerPedId(), false)
    SetEntityVisible(PlayerPedId(), true, false)
    cb('ok')
end)

-- Funkce pro uložení postavy
RegisterNUICallback('saveCharacter', function(data, cb)
    local firstname = data.firstname
    local lastname = data.lastname
    local dob = data.dob
    local gender = data.gender

    -- Kontrola, jestli jsou všechna data vyplněná
    if not firstname or not lastname or not dob or not gender then
        cb({ success = false, error = "Please fill in all fields." })
        return
    end

    -- Poslat data na server pro uložení
    TriggerServerEvent('character_creator:saveCharacter', data)
    cb({ success = true })
    TriggerEvent('character_creator:closeUI') -- Zavřít UI
end)

-- Příklad příkazu pro otevření UI (např. /createchar)
RegisterCommand('createchar', function()
    TriggerEvent('character_creator:openUI')
end, false)
