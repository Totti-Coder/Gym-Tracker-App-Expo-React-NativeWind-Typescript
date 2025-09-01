import * as React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setisLoading] = React.useState(false);
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <>
        <Text>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
      </>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 px-6">
          {/* MAIN */}
          <View className="flex-1 justify-center">
            {/* Logo */}
            <View style={{ alignItems: "center", marginBottom: 32 }}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: "#2563eb",
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4.65,
                  elevation: 8,
                }}
              >
                <Ionicons name="fitness" size={40} color="white" />
              </View>

              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "#111827",
                  marginBottom: 8,
                  textAlign: "center",
                }}
              >
                Unete a Gym-Tracker
              </Text>

              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#6b7280",
                    textAlign: "center",
                    lineHeight: 24,
                  }}
                >
                  Registra tus entrenamientos{"\n"}y consigue tus objetivos!
                </Text>
              </View>
            </View>

            {/* Formulario */}
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 16,
                padding: 24,
                marginBottom: 24,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 2,
                borderWidth: 1,
                borderColor: "#f3f4f6",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: "#111827",
                  marginBottom: 24,
                  textAlign: "center",
                }}
              >
                Crea tu cuenta
              </Text>

              {/* Email Input */}
              <View style={{ marginBottom: 16 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: 8,
                  }}
                >
                  Email
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#f9fafb",
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    borderWidth: 1,
                    borderColor: "#e5e7eb",
                  }}
                >
                  <Ionicons name="mail-outline" size={20} color="#6B7280" />
                  <TextInput
                    autoCapitalize="none"
                    value={emailAddress}
                    placeholder="Correo electrónico"
                    placeholderTextColor="#9CA3AF"
                    onChangeText={setEmailAddress}
                    style={{
                      flex: 1,
                      marginLeft: 12,
                      color: "#111827",
                      fontSize: 16,
                    }}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={{ marginBottom: 24 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: 8,
                  }}
                >
                  Contraseña
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#f9fafb",
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    borderWidth: 1,
                    borderColor: "#e5e7eb",
                  }}
                >
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#6B7280"
                  />
                  <TextInput
                    value={password}
                    placeholder="Crea una contraseña"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry
                    onChangeText={setPassword}
                    style={{
                      flex: 1,
                      marginLeft: 12,
                      color: "#111827",
                      fontSize: 16,
                    }}
                    editable={!isLoading}
                  />
                </View>
                <Text className="text-xs text-gray-500 mt-1">
                  Debe tener al menos 8 caracteres
                </Text>
              </View>

              {/* Boton de creacion de cuenta */}
              <TouchableOpacity
                onPress={onSignUpPress}
                disabled={isLoading}
                style={{
                  backgroundColor: isLoading ? "#9ca3af" : "#2563eb",
                  borderRadius: 12,
                  paddingVertical: 16,
                  marginBottom: 16,
                }}
              >
                <View className="flex-row items-center justify-center">
                  {isLoading ? (
                    <ActivityIndicator 
                    size="small" 
                    color="white" />
                  ) : (
                    <Ionicons
                      name="person-add-outline"
                      size={20}
                      color="white"
                    />
                  )}
                  <Text className="text-white font-semibold text-lg ml-2">
                    {isLoading ? "Creando la cuenta..." : "Crea tu cuenta"}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Already have an account */}
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text>Ya tienes una cuenta? </Text>
                <Link href="/sign-in">
                  <Text style={{ color: "#2563eb", fontWeight: "600" }}>
                    Inicia sesion
                  </Text>
                </Link>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
