import { Button, Image } from "react-native";
import { View, Text } from "react-native";
import { useQuery } from "react-query";
import { getPokemonsById } from "../services/pokemonService";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function PokemonScreen({ route }) {
  const { name } = route.params;

  const { isLoading, isError, data, error } = useQuery("pokemon", (pokemonName) =>
    getPokemonsById(name)
  );
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }
  const showTypes = (array) => {

      return array.map((type, idx) => {
        return <Text key={idx}>{type.type.name}</Text>;
  })}

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
          borderWidth: 3,
          margin: 5,
          padding: 5,
          backgroundColor: "grey",
          borderRadius: 4,
        }}
      >
        <View style={{ borderWidth: 2 }}>
          <Text>{capitalizeFirstLetter(name)}</Text>
          <View>
            <Image
              source={{ uri: data.sprites.front_default }}
              style={{ width: 200, height: 200 }}
            />
          </View>
        </View>
        <View style={{ borderWidth: 1 }}>
          <Text>Types: </Text>
          {showTypes(data.types)}
        </View>
      </View>
    </>
  );
}
