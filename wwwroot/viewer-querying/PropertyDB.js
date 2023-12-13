export function userFunction(pdb, searchedProperty) {
    var searchedAttrId = -1;
    // Iterate over all attributes and find the index to the one we are interested in
    pdb.enumAttributes(function (i, attrDef, attrRaw) {
        var name = attrDef.name;
        if (name === searchedProperty) {
            searchedAttrId = i;
            return true; // to stop iterating over the remaining attributes.
        }
    });
    // Early return is the model doesn't contain data for "searchedProperty".
    if (searchedAttrId === -1)
        return null;
    // Now iterate over all parts to find out which one is the largest.
    var maxValue = 0;
    var maxValId = -1;
    pdb.enumObjects(function (dbId) {
        // For each part, iterate over their properties.
        pdb.enumObjectProperties(dbId, function (attrId, valId) {
            // Only process 'searchedProperty' property.
            // The word "Property" and "Attribute" are used interchangeably.
            if (attrId === searchedAttrId) {
                var value = pdb.getAttrValue(attrId, valId);
                if (value > maxValue) {
                    maxValue = value;
                    maxValId = dbId;
                }
                // Stop iterating over additional properties when "searchedProperty" is found.
                return true;
            }
        });
    });
    // Return results
    return {
        id: maxValId,
        mass: maxValue
    }
}
