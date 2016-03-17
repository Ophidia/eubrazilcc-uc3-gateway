/**
Eubrazil Scientific Gateway
Copyright (C) 2015 CMCC

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
**/

package it.cmcc.sessionhandling.interceptors;

import it.cmcc.sessionhandling.beans.User;

import java.util.Map;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

public class LoginInterceptor extends AbstractInterceptor {
	
	private static final long serialVersionUID = 1L;
	
	public void init() { }
	
	public void destroy() { }

	public String intercept (ActionInvocation invocation) throws Exception {
		
		Map<String, Object> session = invocation.getInvocationContext().getSession();
		User user = (User) session.get("USER");
		
		if(user == null) {
			System.out.println("User not authenticated");
			return Action.LOGIN;
		}
        else {
        	System.out.println("User authenticated");
        	Action action = (Action) invocation.getAction();
            if(action instanceof UserAware){
                ((UserAware) action).setUser(user);
            }
        	return invocation.invoke();
        }
    }
}
