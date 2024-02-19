const data = {
    continents: [
        { id: "1", name: 'Africa' },
        { id: "2", name: 'Antarctica' },
        { id: "3", name: 'Asia' },
        { id: "4", name: 'Australia' },
        { id: "5", name: 'Europe' },
        { id: "6", name: 'North America' },
        { id: "7", name: 'South America' },
    ],
    languages: [
        { id: "1", name: 'English', code: 'en' },
        { id: "2", name: 'French', code: 'fr' },
        { id: "3", name: 'German', code: 'de' },
        { id: "4", name: 'Spanish', code: 'es' },
        { id: "5", name: 'Pashto', code: 'ps' },
        { id: "6", name: 'Bangla', code: 'bn' },
    ],
    countries: [
        { id: "1", name: 'Afghanistan', capital: 'Kabul', currency: 'Afghan afghani', continent_id: "3", language_id: "5" },
        { id: "2",  name: 'Bangladesh', capital: 'Dhaka', currency: 'BDT', continent_id: "3", language_id: "6" },
        { id: "3", name: 'Albania', capital: 'Tirana', currency: 'Albanian lek', continent_id: "5", language_id: "1" },
        { id: "4", name: 'Algeria', capital: 'Algiers', currency: 'Algerian dinar', continent_id: "3", language_id: "2" },
        { id: "5", name: 'American Samoa', capital: 'Pago Pago', currency: 'United States Dollar', continent_id: "6", language_id: "4" },
        { id: "6", name: 'Andorra', capital: 'Andorra la Vella', currency: 'Euro', continent_id: "5", language_id: "1" },      
    ],
};

export const resolvers = {
    Continent: {
        countries: (parent) => data.countries.filter(country => country.continent_id === parent.id),
    },
    Country: {
        continent: (parent) => data.continents.find(continent => continent.id === parent.continent_id),
        language: (parent) => data.languages.find(language => language.id === parent.language_id),
    },
    Language: {
        countries: (parent) => data.countries.filter(country => country.language_id === parent.id),
    },
    
    Query: {
        continents: () => data.continents,
        continent: (parent, { id }) => data.continents.find(continent => continent.id === id),
        countries: () => data.countries,
        country: (parent, { id }) => data.countries.find(country => country.id === id),
        languages: () => data.languages,
        language: (parent, { id }) => data.languages.find(language => language.id === id),
    },

    Mutation: {
        addCountry: (parent, { name, capital, currency, continent_id, language_id }) => {
            const country = { id: (data.countries.length + 1).toString(), name, capital, currency, continent_id, language_id };
            data.countries.push(country);
            return country;
        },
        deleteCountry: (parent, { id }) => {
            const countryIndex = data.countries.findIndex(country => country.id === Number(id));
            if (countryIndex === -1) {
                return null;
            }
            const country = data.countries[countryIndex];
            data.countries.splice(countryIndex, 1);
            return country;
        },
        addLanguage: (parent, { name, code }) => {
            const language = { id: (data.languages.length + 1).toString(), name, code };
            data.languages.push(language);
            return language;
        },
    }
}