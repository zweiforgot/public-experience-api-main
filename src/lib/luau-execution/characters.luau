local ReplicatedStorage = game:GetService("ReplicatedStorage")

workspace:SetAttribute("OpenCloudLuauExecution", true)
ReplicatedStorage.STATUS.hasServerInitialized.Value = true

local Characters = require(ReplicatedStorage.CharacterStorage.CharacterInformation.Characters)

return Characters.Data