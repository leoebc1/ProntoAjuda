import { Image, StyleSheet } from "react-native";

type BasicImageProps = {
    uri: string //link da imagem
}
const BasicImage: React.FC<BasicImageProps> = ({ uri}) => {
    return <Image source={{uri}} style={styles.image} />
}
const styles = StyleSheet.create({
    image: {
        width: 350,
        height: 200,
        borderRadius: 10,
        margin: 0
    }
})
export default BasicImage