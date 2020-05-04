package com.toyota.tmna.lexusdrivers.core.factory;


import java.util.Dictionary;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import javax.inject.Inject;

import com.toyota.tmna.lexusdrivers.core.util.ConstantsUtil;
import org.osgi.framework.BundleContext;
import org.osgi.framework.FrameworkUtil;
import org.osgi.framework.ServiceReference;
import org.osgi.service.cm.Configuration;
import org.osgi.service.cm.ConfigurationAdmin;
import org.osgi.service.component.ComponentContext;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(immediate = true)
@Designate(ocd = HeaderFactoryEndPoints.Config.class)
public class HeaderFactoryEndPoints implements IFactory{
	@ObjectClassDefinition(name = "Header Factory mapping configuration", description = "Contains all Endpoints to systems external to AEM")
	public static @interface Config {
	}
	private static final Logger log = LoggerFactory.getLogger(HeaderFactoryEndPoints.class);
	final String UrlService_PID = ConstantsUtil.URL_SERVICE_PID;
	private static Map<String, String> endPointsMap;

	@Inject
	ComponentContext componentContext;

	@Reference
	ConfigurationAdmin configAdmin;


	@Activate
	public void activate(Map<String, Object> properties) {
              readProperties(properties);

	}

	protected void readProperties(Map<String, Object> properties) {
		endPointsMap = new HashMap<String, String>();
		if (configAdmin == null) {
			BundleContext btx = FrameworkUtil.getBundle(this.getClass()).getBundleContext();
			ServiceReference<?> sf = btx.getServiceReference(ConfigurationAdmin.class.getName());
			configAdmin = (ConfigurationAdmin) btx.getService(sf);
		}
		try {
			Configuration config = configAdmin.getConfiguration(UrlService_PID);
			Dictionary<String, Object> prop = config.getProperties();
			Enumeration<String> keys = prop.keys();
			while(keys.hasMoreElements())
			{
			String key=keys.nextElement().toString();
			String value=prop.get(key).toString();
			endPointsMap.put(key, value);			
			}
		} catch (Exception e) {
			log.error("Header Factory : "+e.getLocalizedMessage());
		}
	}
	
	@Override
	public String getServiceEndpoint(String serviceName) {
		String endPointURL = "";
		if (endPointsMap != null && endPointsMap.containsKey(serviceName)) {
			endPointURL = endPointsMap.get(serviceName);
		}
		
		return endPointURL;
	}
	
	
}
