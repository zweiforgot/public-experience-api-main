_G.Server = {
    IsOnStaging = false
}

local Store = require(game.ServerScriptService.Server.World.Stores["Classic Store"]).new() 
Store:CalculateSeed()

local Items = Store.CurrentItems
return Items

-- local List = {}
-- for _, item in pairs(Items) do
-- 	local Info = game.ServerScriptService.Server.Content.Object:FindFirstChild(item, true)

-- 	if (Info and Info:FindFirstChild("Store")) then
-- 		local Details = require(Info.Store).new()

-- 		List[item] = Details.Price
-- 	end
-- end

-- return List