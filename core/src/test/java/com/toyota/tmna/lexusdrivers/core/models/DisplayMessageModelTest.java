package com.toyota.tmna.lexusdrivers.core.models;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.models.factory.ModelFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import io.wcm.testing.mock.aem.junit5.AemContext;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class DisplayMessageModelTest {
    private final AemContext context = new AemContext();
    @Mock
    private ModelFactory modelFactory;
    private   DisplayMessageModel displayMessageModel;


    @BeforeEach
    void setUp()  {
        context.addModelsForClasses(DisplayMessageModel.class);
        context.load().json("/com/toyota/tmna/lexusdrivers/core/models/DisplayMessageTest.json", "/content");
        context.registerService(ModelFactory.class, modelFactory,
                org.osgi.framework.Constants.SERVICE_RANKING, Integer.MAX_VALUE);
        context.currentResource("/content/displaymessage");
        displayMessageModel = context.request().adaptTo(DisplayMessageModel.class);


    }

    @Test
    void getPrimaryButtonText() {
        String expected = "Find us";
        String actual = displayMessageModel.getPrimaryButtonText();
        assertEquals(expected, actual);
    }

    @Test
    void getPrimaryButtonLink() {
        String expected = "/content/lexusdrivers/us";
        String actual = displayMessageModel.getPrimaryButtonLink();
        assertEquals(expected, actual);
    }

    @Test
    void getDescription() {
        String expected = "Display Description";
        String actual = displayMessageModel.getDescription();
        assertEquals(expected, actual);
    }

    @Test
    void getVerticalCenterAlign() {
        String expected = "true";
        String actual = displayMessageModel.getVerticalCenterAlign();
        assertEquals(expected, actual);
    }

    @Test
    void getSupportContent() {
        String expected = "Display Support Content";
        String actual = displayMessageModel.getSupportContent();
        assertEquals(expected, actual);
    }

    @Test
    void getTitle() {
        String expected = "Display Title";
        String actual = displayMessageModel.getTitle();
        assertEquals(expected, actual);
    }


}