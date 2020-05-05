package com.toyota.tmna.lexusdrivers.core.factory;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.osgi.service.cm.Configuration;
import org.osgi.service.cm.ConfigurationAdmin;
import org.osgi.service.component.ComponentContext;
import org.osgi.service.component.annotations.Reference;

import javax.inject.Inject;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class HeaderFactoryEndPointsTest {
    private static Map<String, String> endPointsMap = new HashMap<>();
    private static Map<String, Object> endPointsObject = new HashMap<>();
    private final AemContext context = new AemContext();
    @Mock
    ComponentContext componentContext;

    @Mock
    ConfigurationAdmin configAdmin;
    @BeforeEach
    void setUp() {
         configAdmin = context.getService(ConfigurationAdmin.class);
        endPointsMap.put("eospublic","https://region1.test.eos.toyota.com");
        endPointsMap.put("x-eos-api-key","CIzm7ytLco5j7FINAtTGm1xAqDODwrVd8zHhtXZ1");
        endPointsMap.put("dcs3","https://api.siint.deops.toyota.com");
        endPointsMap.put("x-dcs-api-key","kkveIpcTwE57HNHQl4oiBX2UcI7smBM7lQm1YtZd");


    }


    @Test
    void readProperties() {
        assertEquals(endPointsMap.get("eospublic"),"https://region1.test.eos.toyota.com");
    }

    @Test
    void getServiceEndpoint() throws IOException {
        HeaderFactoryEndPoints headerFactoryEndPoints =  new HeaderFactoryEndPoints();
        Configuration config = configAdmin.getConfiguration(headerFactoryEndPoints.UrlService_PID);
        headerFactoryEndPoints.setConfigAdmin(configAdmin);
        headerFactoryEndPoints.readProperties(endPointsObject);
        String expected = headerFactoryEndPoints.getServiceEndpoint("eospublic");
        assertNotNull(expected);
    }

    @Test
    void getConfigAdmin() {
        assertNotNull(configAdmin);

    }
}