import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  BackHandler,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  CarouselPagination,
  Header,
} from "@components/Home";
import { RoundedContainer, SafeAreaView } from "@components/containers";
import { COLORS } from "@constants/theme";
import { showToastMessage } from "@components/Toast";
import { useLoader } from "@hooks";
import { useAuthStore } from '@stores/auth';
import { OverlayLoader } from "@components/Loader";

const HomeScreen = ({ navigation }) => {
  const [backPressCount, setBackPressCount] = useState(0);

  const handleBackPress = useCallback(() => {
    if (navigation.isFocused()) {
      if (backPressCount === 0) {
        setBackPressCount(1);
        return true;
      } else if (backPressCount === 1) {
        BackHandler.exitApp();
      }
    }
    return false; // Allow default back action
  }, [backPressCount, navigation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );
    return () => backHandler.remove();
  }, [handleBackPress]);

  useEffect(() => {
    const backPressTimer = setTimeout(() => {
      setBackPressCount(0);
    }, 2000);

    return () => clearTimeout(backPressTimer);
  }, [backPressCount]);

  useEffect(() => {
    // Show toast message when backPressCount changes to 1
    if (backPressCount === 1) {
      showToastMessage("Press back again to exit");
    }
  }, [backPressCount]);

  const authUser = useAuthStore((s) => s.user);

  useEffect(() => {
    if (authUser) {
      const uid = authUser.uid || authUser.id || null;
      const uname = authUser.name || authUser.username || authUser.partner_display_name || null;
      console.log('[AUTH] current user id:', uid, 'name:', uname);
    } else {
      console.log('[AUTH] no authenticated user');
    }
  }, [authUser]);

  const navigateToScreen = (screenName) => {
    // Check if user is admin for UsersScreen
    if (screenName === 'UsersScreen') {
      const isAdmin = authUser?.uid === 2 || authUser?.is_admin === true || authUser?.is_superuser === true;
      if (!isAdmin) {
        showToastMessage("Only administrators can access this feature");
        return;
      }
    }
    navigation.navigate(screenName);
  };

  const [detailLoading] = useLoader(false);


  return (
    <SafeAreaView backgroundColor={COLORS.primaryThemeColor}>
      {/* rounded border */}
      <RoundedContainer>
        {/* Header */}
        <Header />
        <View style={{ marginTop: -18, marginBottom: 8 }}>
          <CarouselPagination />
        </View>

        {/* Section */}
          {/* Action Buttons Section */}
          <View style={styles.posSection}>
  <View style={styles.posContainer}>
    <View style={styles.buttonWrapper}>
      <TouchableOpacity
        onPress={() => navigateToScreen('POSRegister')}
        activeOpacity={0.8}
        style={styles.posButton}
      >
        <View style={styles.iconCircle}>
          <Image
            source={require('@assets/images/Home/section/possss.png')}
            style={styles.posImage}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.buttonLabel}>POS</Text>
    </View>

    <View style={styles.buttonWrapper}>
      <TouchableOpacity
        onPress={() => navigateToScreen('SalesReport')}
        activeOpacity={0.8}
        style={styles.salesReportButton}
      >
        <View style={styles.iconCircle}>
          <Image
            source={require('@assets/images/Home/section/salesreportbtn.png')}
            style={styles.posImage}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.buttonLabel}>Sales Report</Text>
    </View>

    <View style={styles.buttonWrapper}>
      <TouchableOpacity
        onPress={() => navigateToScreen('Products')}
        activeOpacity={0.8}
        style={styles.productsButton}
      >
        <View style={styles.iconCircle}>
          <Image
            source={require('@assets/images/Home/section/productsbutton.png')}
            style={styles.posImage}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.buttonLabel}>Products</Text>
    </View>
  </View>

  {/* Second Row */}
  <View style={[styles.posContainer, { marginTop: 20 }]}>
    <View style={styles.buttonWrapper}>
      <TouchableOpacity
        onPress={() => navigateToScreen('UsersScreen')}
        activeOpacity={0.8}
        style={styles.usersButton}
      >
        <View style={styles.iconCircle}>
          <Image
            source={require('@assets/images/Home/section/userbtnhome.png')}
            style={styles.posImage}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.buttonLabel}>Users</Text>
    </View>
  </View>
</View>
        <OverlayLoader visible={detailLoading} />
      </RoundedContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemInvisible: {
    backgroundColor: "transparent",
  },
  itemStyle: {
    flex: 1,
    alignItems: "center",
    margin: 6,
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: "white",
  },
  posSection: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  posContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 30,
  },
  buttonWrapper: {
    alignItems: "center",
    maxWidth: 100,
  },
  posButton: {
    width: 90,
    height: 90,
    borderRadius: 22,
    backgroundColor: "#fff",
    borderWidth: 2.5,
    borderColor: "#461c8aff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#461c8aff",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  salesReportButton: {
    width: 90,
    height: 90,
    borderRadius: 22,
    backgroundColor: "#fff",
    borderWidth: 2.5,
    borderColor: "#461c8aff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#461c8aff",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  productsButton: {
    width: 90,
    height: 90,
    borderRadius: 22,
    backgroundColor: "#fff",
    borderWidth: 2.5,
    borderColor: "#461c8aff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#461c8aff",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  usersButton: {
    width: 90,
    height: 90,
    borderRadius: 22,
    backgroundColor: "#fff",
    borderWidth: 2.5,
    borderColor: "#461c8aff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#461c8aff",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f5f0ff",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLabel: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "700",
    color: "#461c8aff",
    textAlign: "center",
    letterSpacing: 0.3,
  },
  posImage: {
    width: 56,
    height: 56,
  },
});

export default HomeScreen;
