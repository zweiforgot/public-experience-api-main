local List = {}

for _, item in game.ServerScriptService:GetChildren() do
    List[#List+1] = item.Name
end


return List