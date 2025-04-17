
import React, { useState } from 'react';
import { MessageSquare, Search, User, Send, Clock, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';

const mockContacts = [
  { id: 1, name: 'Water Department', avatar: '💧', lastMessage: 'Thank you for your request', time: '10:30 AM', unread: 2 },
  { id: 2, name: 'Electricity Department', avatar: '⚡', lastMessage: 'We will send a team tomorrow', time: '9:15 AM', unread: 0 },
  { id: 3, name: 'Health Department', avatar: '🏥', lastMessage: 'Your request has been approved', time: 'Yesterday', unread: 0 },
  { id: 4, name: 'Waste Management', avatar: '♻️', lastMessage: 'Collection schedule updated', time: 'Yesterday', unread: 1 },
  { id: 5, name: 'Parks & Recreation', avatar: '🌳', lastMessage: 'New park maintenance plan', time: '2 days ago', unread: 0 },
  { id: 6, name: 'Police Department', avatar: '👮', lastMessage: 'Security update for your area', time: '3 days ago', unread: 0 },
];

const mockMessages = [
  { id: 1, sender: 'Water Department', text: 'Hello, how can we help you today?', time: '10:15 AM', isMe: false },
  { id: 2, sender: 'You', text: 'I need to submit a request regarding water supply in Sector 5.', time: '10:20 AM', isMe: true },
  { id: 3, sender: 'Water Department', text: 'We have received your request and will process it shortly.', time: '10:25 AM', isMe: false },
  { id: 4, sender: 'Water Department', text: 'Our team will be visiting the location tomorrow.', time: '10:28 AM', isMe: false },
  { id: 5, sender: 'You', text: 'Thank you for the quick response!', time: '10:30 AM', isMe: true },
];

const Messages = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(mockContacts[0]);
  const [currentMessage, setCurrentMessage] = useState('');

  const filteredContacts = mockContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (currentMessage.trim() === '') return;
    // In a real app, this would send the message to the backend
    console.log('Sending message:', currentMessage);
    setCurrentMessage('');
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)]">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden h-[calc(100vh-8rem)]">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
          {/* Left sidebar - Contacts */}
          <div className="border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Search contacts..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <Tabs defaultValue="all">
              <div className="px-4 pt-2">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
                  <TabsTrigger value="departments" className="flex-1">Departments</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="m-0">
                <ScrollArea className="h-[calc(100vh-12rem)]">
                  {filteredContacts.map(contact => (
                    <div 
                      key={contact.id}
                      className={`flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer ${selectedContact.id === contact.id ? 'bg-gray-50' : ''}`}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">
                        {contact.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium truncate">{contact.name}</h3>
                          <span className="text-xs text-gray-500">{contact.time}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                          {contact.unread > 0 && (
                            <span className="bg-jd-lavender text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {contact.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="unread" className="m-0">
                <ScrollArea className="h-[calc(100vh-12rem)]">
                  {filteredContacts.filter(c => c.unread > 0).map(contact => (
                    <div 
                      key={contact.id}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedContact(contact)}
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">
                        {contact.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium truncate">{contact.name}</h3>
                          <span className="text-xs text-gray-500">{contact.time}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                          {contact.unread > 0 && (
                            <span className="bg-jd-lavender text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {contact.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="departments" className="m-0">
                <ScrollArea className="h-[calc(100vh-12rem)]">
                  {filteredContacts.map(contact => (
                    <div 
                      key={contact.id}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedContact(contact)}
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">
                        {contact.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{contact.name}</h3>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right side - Chat */}
          <div className="col-span-2 flex flex-col h-full">
            {/* Chat header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">
                  {selectedContact.avatar}
                </div>
                <div>
                  <h2 className="font-medium">{selectedContact.name}</h2>
                  <p className="text-xs text-gray-500">Last active 5 minutes ago</p>
                </div>
              </div>
            </div>
            
            {/* Chat messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {mockMessages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${message.isMe ? 'bg-jd-lavender text-white' : 'bg-gray-100'} p-3 rounded-lg`}>
                      {!message.isMe && (
                        <div className="font-medium text-sm mb-1">{message.sender}</div>
                      )}
                      <p>{message.text}</p>
                      <div className={`text-xs mt-1 flex items-center justify-end ${message.isMe ? 'text-gray-200' : 'text-gray-500'}`}>
                        {message.time}
                        {message.isMe && <CheckCircle2 className="ml-1 h-3 w-3" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {/* Message input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <Input 
                  placeholder="Type your message..." 
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  className="flex-1"
                />
                <Button 
                  className="bg-jd-lavender hover:bg-jd-purple"
                  onClick={handleSendMessage}
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
