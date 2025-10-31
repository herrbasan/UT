export default {
    match_conditions: {
        '==' : { label: 'Equals', numeric: false, fn: function(a, b){ return a == b; }},
        '!=' : { label: 'Not Equals', numeric: false, fn: function(a, b){ return a != b; }},
        '>' : { label: 'Greater Than', numeric: true, fn: function(a, b){ return a > b; }},
        '<' : { label: 'Less Than', numeric: true, fn: function(a, b){ return a < b; }},
        '>=' : { label: 'Greater Than or Equal', numeric: true, fn: function(a, b){ return a >= b; }},
        '<=' : { label: 'Less Than or Equal', numeric: true, fn: function(a, b){ return a <= b; }},
        'contains' : { label: 'Contains', numeric: false, fn: function(a, b){ return String(a).indexOf(String(b)) > -1; }},
        '!contains' : { label: 'Does Not Contain', numeric: false, fn: function(a, b){ return String(a).indexOf(String(b)) == -1; }},
        'includes' : { label: 'Includes', numeric: false, fn: function(a, b){ return Array.isArray(a) && a.includes(b); }},
        'contains_any' : { label: 'Contains Any', numeric: false, fn: function(a, b){ 
            if (!Array.isArray(b)) return false;
            const terms = a.toLowerCase().split(',').map(x => x.trim());
            return b.some(val => terms.includes(val.toLowerCase())); 
        }},
        'contains_all' : { label: 'Contains All', numeric: false, fn: function(a, b){ 
            if (!Array.isArray(b)) return false;
            const terms = a.toLowerCase().split(',').map(x => x.trim());
            return b.every(val => terms.includes(val.toLowerCase())); 
        }},
        'is' : { label: 'Is Strictly Equal', numeric: false, fn: function(a, b){ return a === b; }},
        '!is' : { label: 'Is Not Strictly Equal', numeric: false, fn: function(a, b){ return a !== b; }}
    },

    match: function(item, condition, value){
        try {
            // Check if condition exists
            if (!this.match_conditions.hasOwnProperty(condition)) {
                console.warn(`Invalid condition: ${condition}`);
                return false;
            }

            // Check for null/undefined
            if (item === undefined || item === null) {
                return false;
            }

            // Get condition object
            const condObj = this.match_conditions[condition];

            // Handle numeric comparisons
            if (condObj.numeric) {
                const numItem = Number(item);
                const numValue = Number(value);
                if (isNaN(numItem) || isNaN(numValue)) {
                    console.warn(`Invalid numeric comparison: ${item} ${condition} ${value}`);
                    return false;
                }
                return condObj.fn(numItem, numValue);
            }

            // Non-numeric comparison
            return condObj.fn(item, value);
        } catch (error) {
            console.warn(`Error in match function: ${error.message}`);
            return false;
        }
    },

    turboFilter: function(data, conditions, ignoreCase = false) {
        const result = [];
        const len = data.length;
        const condKeys = Object.keys(conditions);
        const condLen = condKeys.length;
        const condCache = condKeys.map(key => ({
            key,
            condition: conditions[key].condition,
            value: conditions[key].value,
            ignoreCase: conditions[key].ignoreCase !== undefined ? conditions[key].ignoreCase : ignoreCase
        }));
        
        for(let i = 0; i < len; i++) {
            const item = data[i];
            let matches = 0;
            
            for(let j = 0; j < condLen; j++) {
                const cond = condCache[j];
                const itemValue = this.deep_get(item, cond.key);
                
                // Apply case insensitivity if needed for string comparisons
                let compareValue = itemValue;
                let compareCondValue = cond.value;
                
                if(cond.ignoreCase && typeof compareValue === 'string' && typeof compareCondValue === 'string') {
                    compareValue = compareValue.toLowerCase();
                    compareCondValue = compareCondValue.toLowerCase();
                }
                
                if(this.match(compareValue, cond.condition, compareCondValue)) {
                    matches++;
                }
            }
            
            if(matches === condLen) {
                result.push(item);
            }
        }
        
        return result;
    },

    filter: (param) => {
        console.warn('ut.filter is deprecated and is now a shortcut to the ut.turboFilter function, please update your code');

        // Convert old filter parameters to turboFilter format
        const conditions = {};
        const props = param.prop || [];
        
        // If there are properties to search through, set up conditions for each
        if (props.length > 0) {
            for (let i = 0; i < props.length; i++) {
                conditions[props[i]] = {
                    condition: 'contains',
                    value: param.search,
                    ignoreCase: param.ignore_case
                };
            }
            
            // Use turboFilter with OR logic (only one condition needs to match)
            const allResults = [];
            for (const key in conditions) {
                const singleCondition = {};
                singleCondition[key] = conditions[key];
                const results = this.turboFilter(param.data, singleCondition, param.ignore_case);
                
                // Add unique results to the allResults array
                for (const item of results) {
                    if (!allResults.includes(item)) {
                        allResults.push(item);
                    }
                }
            }
            
            // Handle index-only return
            if (param.return_index_only) {
                let indices = [];
                for (let i = 0, len = allResults.length; i < len; i++) {
                    indices.push(param.data.indexOf(allResults[i]));
                }
                allResults = indices;
            }
            return allResults;
        }
        
        // If no properties, return empty array
        return [];
    }
};